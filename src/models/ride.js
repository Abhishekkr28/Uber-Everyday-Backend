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
    days: {
      type: [Number],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cost: {
      type: Number,
      required: false,
      default: -1,
    },
    per_ride_avg: {
      type: Number,
    },
    bill: {
      type: Number,
      required: false,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

rideSchema.virtual("ride_info", {
  ref: "Trip",
  localField: "_id",
  foreignField: "owner",
});

rideSchema.methods.calculateBill = async function () {
  const ride = this;
  await ride.populate("ride_info");

  /**
   * Calculate bill
   */
  const bill = 0;
  // END LOGIC

  ride.bill = bill;
  await ride.depopulate("ride_info");
  await ride.save();

  return bill;
};

rideSchema.pre("save", async function (next) {
  const ride = this;

  if (ride.cost == -1) {
    // calculate cost;
    const basePrice = 53;
    const ratePerKm = 7;
    const rideTimeChargePerMin = 0.8;
    const distanceInKm = ride.distance;
    const timeInMin = ride.duration;
    const distanceCharge = ratePerKm * distanceInKm;
    const rideTimeCharge = rideTimeChargePerMin * timeInMin;
    const perDayCost = basePrice + distanceCharge + rideTimeCharge;
    // 5% discount
    perDayCost *= 0.95;
    const cost = 0;
    // end logic

    ride.per_ride_avg = perDayCost;
    ride.cost = cost;
  }

  next();
});

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
