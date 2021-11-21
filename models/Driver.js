const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  rides: {
    type: Number,
    required: true,
  },
  rating: {
    type: mongoose.Decimal128,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Drivers", driverSchema);
