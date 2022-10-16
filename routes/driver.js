const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");
const mailUtils = require("../utils/mailUtils");
const otpGenerator = require("otp-generator");

//mapbox setup
const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeoCoding({ accessToken: mapBoxToken });

//routes
router.post("/", async (req, res) => {
  try {
    const destination = await geoCoder
      .forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
      .send();
    const driver = await Driver.aggregate([{ $sample: { size: 1 } }]);
    console.log(driver);
    res.send({
      driver,
      coords: destination.body.features[0].geometry.coordinates,
    });
  } catch (e) {
    console.log("Error: " + e);
  }
});

router.post("/otp", async (req, res) => {
  try {
    const { mail } = req.body;
    var otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    mailUtils.sendOTP(mail, otp);
    if (otp.charAt(0) === "0") {
      otp = Number(otp) + 100000;
    }
    res.send(otp);
  } catch (e) {
    console.log("Error: " + e);
  }
});

module.exports = router;
