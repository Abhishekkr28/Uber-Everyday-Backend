const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = {
  type: String,
  required: true,
};
const rideSchema = new Schema(
  {
    source: {
      place_name: reqString,
      place_cord: {
        type: [Number, Number],
        required: true,
      },
    },
    destination: {
      place_name: reqString,
      place_cord: {
        type: [Number, Number],
        required: true,
      },
    },
    timing: reqString,
    total_traveller: {
      type: Number,
      max: 4,
      required: true,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

rideSchema.virtual("ride_info", {
  ref: "Trip",
  localField: "_id",
  foreignField: "owner",
});

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
