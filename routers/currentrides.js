const express = require('express')
const User = require('../models/user.js');

const currentRides = async(req, res) => {
    const phone = req.query.phone;
    try {
        const user = await User.find({ phone });
        const rides = [];
        user[0].ride.forEach(r => {
            rides.push(r);
        });
        res.status(200).send(rides);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const router = new express.Router();

router.get("/currentRides", currentRides);

module.exports = router;