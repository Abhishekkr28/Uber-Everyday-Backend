const express = require("express");
const Ride = require("../models/ride.js");
const auth = require("../middleware/auth");
const User = require("../models/user.js");

const newRide = async (req, res) => {
  try {
    const ride = new Ride({ ...req.body, owner: req.user._id });

    if (ride) {
      await ride.save();
      res.status(201).send(ride);
    } else {
      res.status(404).send("Ride not Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const getAllUserRides = async (req, res) => {
  try {
    const user = await req.user.populate("ride");
    console.log(user.ride);

    res.status(200).send(user.ride);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const getRide = async (req, res) => {
  try {
    const _id = req.params.id;
    const ride = await Ride.findOne({ _id, owner: req.user._id });
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

const completeRide = async (req, res) => {
  try {
    const _id = req.params.id;
    const date_id = req.body.date;

    const filter = {
      _id,
      owner: req.user._id,
      ride_info: {
        $elemMatch: {
          date_id,
        },
      },
    };
    const query = {
      $set: { "ride_info.$[first].ride_status": 1 },
    };

    const options = {
      arrayFilters: [{ "first._id": date_id }],
    };

    const ride = await Ride.updateOne(filter, query, options);
    console.log(ride);

    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(400).send("Could not complete ride.");
  }
};

const cancelRide = async (req, res) => {
  try {
    const _id = req.params.id;
    const date_id = req.query.date;

    const filter = {
      _id,
      owner: req.user._id,
      ride_info: {
        $elemMatch: {
          date_id,
        },
      },
    };
    const query = {
      $set: { "ride_info.$[first].ride_status": 2 },
    };

    const options = {
      arrayFilters: [{ "first._id": date_id }],
    };

    const ride = await Ride.updateOne(filter, query, options);
    console.log(ride);

    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(400).send("Could not cancel ride.");
  }
};

const router = new express.Router();

router.post("/ride", auth, newRide);
router.delete("/ride/:id", auth, deleteRide);
router.get("/rides", auth, getAllUserRides);
router.get("/ride/:id", auth, getRide);
router.patch("/ride/complete/:id", auth, completeRide);
router.patch("/ride/cancel/:id", auth, cancelRide);

module.exports = router;
