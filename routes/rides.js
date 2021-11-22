const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const rides = require("../models/rides");

router.post("/save", auth, async (req, res) => {
  if (req.body.price != 0 && req.body.price < 3000) {
    const rideHistory = rides(req.body);
    rideHistory.user = req.user._id;
    await rideHistory.save();
  }
  res.send("save ride");
});

router.get("/getRides", auth, async (req, res) => {
  const rideHistory = await rides.find({ user: req.user._id });
  res.send({ rideHistory });
});

module.exports = router;
