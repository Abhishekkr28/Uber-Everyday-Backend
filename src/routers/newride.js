const express = require('express')
const User = require('../models/user.js');
const Ride = require('../models/ride.js');

const newRide = async (req, res) => {
    try {
        const phone = req.query.phone;
        const newride = new Ride({ ...req.body });
        const user = await User.findOne({ phone });

        if (user) {
            await newride.save();
            user.ride.push(newride.id);
            await user.save();
            res.status(201).send(user);
        }
        else {
            res.status(404).send("User not Found")
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);;
    }
}

const getAllUserRides = async (req, res) => {
    try {
        const phone = req.query.phone;
        const rides = await Ride.find({ phone });
        res.status(200).send(rides);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const getRide = async (req, res) => {
    try {
        const id = req.body.id;
        const ride = await Ride.findOne({ id });
        res.status(200).send(ride);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const deleteRide = async (req, res) => {
    try {
        const id = req.query.id;
        const ride = await Ride.findOne({ id });
        if (ride) {
            const user = await User.findOne({ phone: ride.phone });
            if (user) {
                user.ride = user.ride.filter(rideId => rideId != id);
                await user.save();
                await Ride.deleteMany(ride);
                res.status(200).send(ride);
            }
        }
        else {
            res.status(404).send("Ride no Found!");
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const router = new express.Router();

router.post("/newRide", newRide);
router.post("/deleteRide", deleteRide);
router.get("/getAllUserRides", getAllUserRides);
router.get("/getRide", getRide);

module.exports = router;