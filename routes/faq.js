const express = require("express");
const router = express.Router();
const faq = require("../models/faq");

router.post("/", async (req, res) => {
  try {
    const faqQuestion = faq(req.body);
    await faqQuestion.save();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
