const express = require("express");
const Ride = require("../models/ride.js");
const auth = require("../middleware/auth");

const newRide = async (req, res) => {
  try {
    const ride = new Ride({ ...req.body, owner: req.user._id });
    await ride.save();
    res.status(201).send(ride);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const getAllUserRides = async (req, res) => {
  try {
    const rides = await Ride.find({ owner: req.user._id }).populate(
      "ride_info"
    );

    res.status(200).send(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const getRide = async (req, res) => {
  try {
    const _id = req.params.id;
    const ride = await Ride.findOne({ _id, owner: req.user._id });
    await ride.populate("ride_info");
    res.status(200).send(ride);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const deleteRide = async (req, res) => {
  try {
    const _id = req.params.id;
    const ride = await Ride.findOneAndDelete({ _id, owner: req.user._id });
    if (ride) {
      res.status(200).send(ride);
    } else {
      res.status(404).send("Ride not found!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const router = new express.Router();

router.post("/ride", auth, newRide);
router.delete("/ride/:id", auth, deleteRide);
router.get("/rides", auth, getAllUserRides);
router.get("/ride/:id", auth, getRide);

module.exports = router;
