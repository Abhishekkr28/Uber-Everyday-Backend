const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  ride_date: {
    type: Date,
    required: true,
  },
  ride_status: {
    type: Number,
    default: 0,
  },
  // ride_shared: {
  //   type: Boolean,
  //   required: false,
  //   default: false,
  // },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Ride",
  },
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
