const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: mongoose.Decimal128,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rides", ridesSchema);
