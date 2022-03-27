const express = require('express')
const User = require('../models/user.js');
const Ride = require('../models/ride.js');

const newRide = async(req, res) => {
    const phone = req.query.phone;
    const newride = new Ride({...req.body });
    try {
        const user = await User.findOne({ phone });
        user.ride.push(newride);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const currentRides = async(req, res) => {
    const phone = req.query.phone;
    try {
        const user = await User.findOne({ phone });
        const rides = [];
        user.ride.forEach(r => {
            rides.push(r);
        });
        res.status(200).send(rides);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const deleteRide = async(req, res) => {
    const phone = req.query.phone;
    const id = req.query.id;
    try {
        const user = await User.findOne({ phone });
        for (let i = 0; i < user.ride.length; i++) {
            if (user.ride[i]._id == id)
                user.ride.splice(i, 1);
        }
        await user.save();
        res.status(201).send(user.ride);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const router = new express.Router();

router.post("/newRide", newRide);
router.post("/deleteRide", deleteRide);
router.get("/currentRides", currentRides);

module.exports = router;