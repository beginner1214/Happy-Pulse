import { useState, useEffect, useRef } from "react";
import { Bot, X, Send, Loader2, Camera, ImagePlus } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm your AI Health Assistant. You can ask me questions or upload medicine images for analysis.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTextMessage = async (userMessage) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/uploadpictur/generate-text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: userMessage }),
        }
      );

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error:", error);
      return "I apologize, but I'm having trouble processing your request. Please try again later.";
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${BASE_URL}/api/uploadpictur/checkmedicine`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      return {
        analysis: data.analysis,
        fileId: data.fileId,
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        analysis: "Sorry, I couldn't analyze the image. Please try again.",
        fileId: null,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = message;
      setMessage("");
      setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
      setIsLoading(true);

      const response = await handleTextMessage(userMessage);

      setMessages((prev) => [...prev, { type: "bot", text: response }]);
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setIsLoading(true);
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          text: "Uploaded medicine image for analysis",
          isImage: true,
          file: URL.createObjectURL(file),
        },
      ]);

      const { analysis, fileId } = await handleImageUpload(file);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: analysis,
          fileId: fileId,
        },
      ]);
      setIsLoading(false);
    }
  };

  const getImageUrl = (fileId) => {
    return fileId ? `${BASE_URL}/api/uploadpictur/image/${fileId}` : "";
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden">
          <div className="bg-[#09B480] p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Health Assistant
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === "user"
                      ? "bg-[#09B480] text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.isImage && msg.file && (
                    <img
                      src={msg.file}
                      alt="Uploaded medicine"
                      className="max-w-full h-auto rounded-lg mb-2"
                    />
                  )}
                  {msg.fileId && (
                    <img
                      src={getImageUrl(msg.fileId)}
                      alt="Stored medicine"
                      className="max-w-full h-auto rounded-lg mb-2"
                    />
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09B480]"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#09B480] text-white p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                disabled={isLoading}
              >
                <ImagePlus className="h-5 w-5" />
              </button>
              <button
                type="submit"
                className="bg-[#09B480] text-white p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#09B480] hover:bg-opacity-90 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200 flex items-center justify-center"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
