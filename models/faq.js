const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faqSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("faq", faqSchema);
