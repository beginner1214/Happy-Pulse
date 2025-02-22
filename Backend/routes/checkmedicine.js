const express = require("express");
const multer = require("multer");
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const MedicineAnalysis = require("../dbSchema/medicineupload");
const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }    
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
 
// Initialize Google AI
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("Error: GOOGLE_API_KEY is not set in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to handle GridFS uploads
async function uploadToGridFS(bucket, file) {
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype
    });

    uploadStream.on('finish', () => {
      resolve(uploadStream.id);
    });

    uploadStream.on('error', (error) => {
      reject(error);
    });

    uploadStream.end(file.buffer);
  });
}

// Retry function with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (error.status === 503) {
        const delay = Math.min(1000 * Math.pow(2, i), 10000); // Max 10 second delay
        console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// Text generation endpoint
router.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    res.json({ response: result.response.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Main medicine check endpoint
router.post("/checkmedicine", upload.single("file"), async (req, res) => {
  let fileId = null;
  const bucket = new GridFSBucket(mongoose.connection.db);
  
  try {
    // Input validation
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Step 1: Upload to GridFS
    try {
      console.log("Starting GridFS upload...");
      fileId = await uploadToGridFS(bucket, req.file);
      console.log("Successfully uploaded to GridFS. File ID:", fileId);
    } catch (uploadError) {
      console.error("GridFS upload failed:", uploadError);
      throw new Error("Failed to upload file to database");
    }

    // Step 2: Prepare image for AI analysis
    console.log("Converting image for AI analysis...");
    const base64File = req.file.buffer.toString("base64");

    // Step 3: Analyze with Google AI
    console.log("Starting AI analysis...");
    const extractedText = await retryWithBackoff(async () => {
      const result = await model.generateContent({
        contents: [{
          role: "user",
          parts: [
            { text: "Extract the text from picture" },
            { inlineData: { mimeType: req.file.mimetype, data: base64File } }
          ]
        }],
      });
      return result.response.candidates[0].content.parts[0].text;
    });
    console.log("AI analysis completed");

    // Step 4: Save analysis to MongoDB
    console.log("Saving analysis to MongoDB...");
    const medicineAnalysis = new MedicineAnalysis({
      filename: req.file.originalname,
      fileId: fileId,
      mimeType: req.file.mimetype,
      analysis: extractedText,
      uploadDate: new Date()
    });

    await medicineAnalysis.save();
    console.log("Analysis saved successfully. ID:", medicineAnalysis._id);

    // Step 5: Send success response
    res.json({
      success: true,
      message: "File processed successfully",
      analysis: extractedText || "No text found in the image",
      uploadId: medicineAnalysis._id,
      fileId: fileId
    });

  } catch (error) {
    console.error("Error in /checkmedicine:", error);
    
    // Cleanup on failure
    if (fileId) {
      try {
        await bucket.delete(fileId);
        console.log("Cleaned up GridFS file after error");
      } catch (cleanupError) {
        console.error("Failed to clean up GridFS file:", cleanupError);
      }
    }
    
    // Error response handling
    if (error.status === 503) {
      res.status(503).json({ 
        error: "The AI service is currently overloaded. Please try again in a few moments.",
        details: error.message
      });
    } else {
      res.status(500).json({ 
        error: "An error occurred while processing your request",
        details: error.message
      });
    }
  }
});

// Utility endpoint to verify GridFS files
router.get("/verify-file/:fileId", async (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db);
    const files = await bucket.find({ 
      _id: new mongoose.Types.ObjectId(req.params.fileId) 
    }).toArray();
    
    if (!files.length) {
      return res.status(404).json({ error: "File not found in GridFS" });
    }
    
    res.json({ 
      message: "File exists in GridFS",
      file: {
        filename: files[0].filename,
        uploadDate: files[0].uploadDate,
        length: files[0].length,
        contentType: files[0].contentType
      }
    });
  } catch (error) {
    console.error("Error verifying file:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 