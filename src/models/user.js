const mongoose = require("mongoose");
// const rideSchema = require('./ride.js').rideSchema;
const Schema = mongoose.Schema;
const reqString = {
  type: String,
  required: true,
};
const userSchema = new Schema(
  {
    name: reqString,
    age: {
      type: Number,
    },
    gender: reqString,
    phone: {
      type: Number,
      required: true,
    },
    email: reqString,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("ride", {
  ref: "Ride",
  localField: "_id",
  foreignField: "owner",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
