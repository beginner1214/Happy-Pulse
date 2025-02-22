const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    }
  });

const Doctorsreal = mongoose.model("Doctorsreal", doctorSchema);

module.exports = Doctorsreal;
