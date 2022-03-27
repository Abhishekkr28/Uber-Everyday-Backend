const express = require('express')
const User = require('../models/user.js');
const completedRide = async(req, res) => {
    const phone = req.query.phone;
    const ride_id = req.body.id;
    const date_id = req.body.date_id;

    try {
        const user = await User.findOne({ phone });
        const arr = [];
        // res.send(user);
        for (let i = 0; i < user.ride.length; i++) {
            if (user.ride[i]._id == ride_id) {

                for (let j = 0; j < user.ride[i].ride_info.length; j++) {
                    if (user.ride[i].ride_info[j]._id == date_id) {
                        user.ride[i].ride_info[j].ride_status = 1;
                        break;
                    }
                }
            }
        }
        await user.save();

        res.send(user);

    } catch (err) {
        res.status(500).send(err);
    }

}
const router = new express.Router();

router.post("/completedRide", completedRide);

module.exports = router;