const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");
const mailUtils = require("../utils/mailUtils");
const otpGenerator = require("otp-generator");

router.post("/", async (req, res) => {
  try {
    const driver = await Driver.aggregate([{ $sample: { size: 1 } }]);
    res.send(driver);
  } catch (e) {
    console.log("Error: " + e);
  }
});

router.post("/otp", async (req, res) => {
  try {
    const { mail } = req.body;
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    mailUtils.sendOTP(mail, otp);
    res.send(otp);
  } catch (e) {
    console.log("Error: " + e);
  }
});

module.exports = router;
