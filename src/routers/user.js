const express = require("express");
const User = require("../models/user.js");

const auth = require("../middleware/auth");

const newUser = async (req, res) => {
  const { phone } = req.body;
  const found = await User.findOne({ phone });

  try {
    if (found) throw "User already exists";
    const user = new User({ ...req.body });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    await req.user.populate("ride");
    res.status(200).send(req.user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const router = new express.Router();

router.post("/user", newUser);
router.get("/user", auth, getUser);

module.exports = router;
