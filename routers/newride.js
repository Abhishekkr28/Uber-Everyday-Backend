const express = require('express')
const User = require('../models/user.js');
const Ride = require('../models/ride.js');
const newRide = async(req, res) => {
    const phone = req.query.phone;
    const newride = new Ride({...req.body });
    try {
        const user = await User.find({ phone });
        user[0].ride.push(newride);
        user[0].save();
        res.status(201).send(user[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}
const router = new express.Router();

router.post("/newRide", newRide);

module.exports = router;