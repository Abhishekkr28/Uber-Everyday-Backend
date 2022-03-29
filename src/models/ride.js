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
    cost: {
      type: Number,
      required: false,
      default: -1,
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

  /**
   * Calculate bill
   */
  const bill = 0;
  // END LOGIC

  ride.bill = bill;
  await ride.save();

  return bill;
};

rideSchema.pre("save", async function (next) {
  const ride = this;

  if (ride.cost == -1) {
    // calculate cost;
    const cost = 0;
    // end logic

    ride.cost = cost;
  }

  next();
});

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
