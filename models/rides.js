const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ridesSchema = new Schema({
  date: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("rides", ridesSchema);
