const mongoose = require('mongoose');

const medicineAnalysisSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  analysis: {
    type: String,
    required: true
  },

});

const MedicineAnalysis = mongoose.model('MedicineAnalysis', medicineAnalysisSchema);
module.exports = MedicineAnalysis