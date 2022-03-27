const express = require('express')
const User = require('../models/user.js');


const deleteRide = async(req, res) => {
    const phone = req.query.phone;
    const id = req.query.id;
    try {
        const user = await User.find({ phone });
        for (let i = 0; i < user[0].ride.length; i++) {
            if (user[0].ride[i]._id == id)
                user[0].ride.splice(i, 1);
        }
        user[0].save();
        res.status(201).send(user[0].ride);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const router = new express.Router();

router.post("/deleteRide", deleteRide);

module.exports = router;