const express = require('express')
const User = require('../models/user.js');
const Ride = require('../models/ride.js');

const completedRide = async (req, res) => {
    try {
        const id = req.query.id;
        const date_id = req.query.date_id;

        const filter = {
            id, "ride_info": {
                "$elemMatch": {
                    date_id
                }
            }
        }
        const query = {
            "$set": { "ride_info.$[first].ride_status": 1 }
        }

        const options = {
            "arrayFilters": [
                { "first._id": date_id }
            ]
        }
        Ride.updateMany(filter, query, options, (err, result) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.status(200).send(result)
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

const missedRide = async (req, res) => {
    try {
        const id = req.query.id;
        const date_id = req.query.date_id;

        const filter = {
            id, "ride_info": {
                "$elemMatch": {
                    date_id
                }
            }
        }
        const query = {
            "$set": { "ride_info.$[first].ride_status": 2 }
        }

        const options = {
            "arrayFilters": [
                { "first._id": date_id }
            ]
        }
        Ride.updateMany(filter, query, options, (err, result) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.status(200).send(result)
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

const router = new express.Router();

router.post("/completedRide", completedRide);
router.post("/missedRide", missedRide);
module.exports = router;