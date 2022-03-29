const express = require("express");
const Trip = require("../models/trip.js");

const auth = require("../middleware/auth");
const Ride = require("../models/ride.js");

const getTrip = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const trip = await Trip.findById(id);
    console.log(trip);
    res.status(200).send(trip);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const getTrips = async (req, res) => {
  try {
    const { owner } = req.params;
    const trips = await Trip.find({ owner });
    console.log(trips);
    res.status(200).send(trips);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const createTrip = async (req, res) => {
  try {
    const { owner } = req.params;
    const trip = new Trip({ ...req.body, owner });
    await trip.save();
    res.status(201).send(trip);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const completeTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, {
      ride_status: 1,
    });

    const ride = await Ride.findByIdAndUpdate(trip.owner, {
      $inc: { completedTrips: 1 },
    });

    await ride.save();
    trip.ride_status = 1;
    res.status(200).send(trip);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const cancelTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, {
      ride_status: 2,
    });
    trip.ride_status = 2;
    res.status(200).send(trip);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const router = new express.Router();

router.post("/trip/:owner", createTrip);
router.get("/trip/:id", auth, getTrip);
router.get("/trips/:owner", auth, getTrips);
router.patch("/trip/complete/:id", auth, completeTrip);
router.patch("/trip/cancel/:id", auth, cancelTrip);

module.exports = router;
