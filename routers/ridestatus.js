const express = require("express");
const User = require("../models/user.js");
const completedRide = async (req, res) => {
  const phone = req.query.phone;
  const ride_id = req.query.id;
  const date = req.query.date;

  try {
    const user = await User.findOne({ phone });
    // User.findByIdAndUpdate({ phone, "ride._id": ride_id }, {});
    for (let i = 0; i < user[0].ride.length; i++) {
      if (user[0].ride[i]._id == ride_id) {
        for (let j = 0; j < user[0].ride[i].total_rides.length; j++) {
          if (user[0].ride[i].total_rides[j] == date) {
            user[0].ride[i].ride_status[j] = 1;
            break;
          }
        }
      }
    }
    await user[0].save();

    // res.send(arr);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};
const router = new express.Router();

router.post("/completedRide", completedRide);

module.exports = router;
