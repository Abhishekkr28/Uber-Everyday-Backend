const express = require('express');
const User = require('../models/user.js');

const newUser = async (req, res) => {
    const user = new User({ ...req.body });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
}


const router = new express.Router();

router.post("/newUser", newUser);

module.exports = router;