const mongoose = require("mongoose");
const moment = require("moment");
const nodemailer = require('nodemailer');
const { roundedRect } = require("pdfkit");
const User = require("./user");

const Schema = mongoose.Schema;
const reqString = {
    type: String,
    required: true,
};
const rideSchema = new Schema({
        source: {
            place_name: reqString,
            place_cord: {
                type: [Number, Number],
                required: false,
            },
        },
        destination: {
            place_name: reqString,
            place_cord: {
                type: [Number, Number],
                required: false,
            },
        },
        duration: {
            type: Number,
            required: true,
        },
        distance: {
            type: Number,
            required: true,
        },
        timing: reqString,
        sharing_allowed: {
            type: Boolean,
            required: false,
            default: false,
        },
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
        bill_no_discount: {
            type: Number,
            required: false,
        },
        bill: {
            type: Number,
            required: false,
        },
        totalTripsPlanned: {
            type: Number,
            required: false,
            default: -1,
        },
        completedTrips: {
            type: Number,
            required: false,
            default: 0,
        },
    },

    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

rideSchema.virtual("ride_info", {
    ref: "Trip",
    localField: "_id",
    foreignField: "owner",
});

rideSchema.methods.calculateBill = async function() {
    const ride = this;
    await ride.populate("ride_info");

    /**
     * Calculate bill
     */

    const bill = ride.completedTrips * ride.per_ride_avg;

    // END LOGIC

    ride.bill = bill;
    await ride.depopulate("ride_info");
    await ride.save();

    return bill;
};

rideSchema.pre("save", async function(next) {
    const ride = this;

    if (ride.totalTripsPlanned == -1) {
        var start_date = moment(ride.start_date);
        var end_date = moment(ride.end_date);
        var count = 0;
        for (var m = moment(start_date); m.isBefore(end_date); m.add(1, 'days')) {
            var day = m.day();
            if (ride.days.includes(day)) {
                count = count + 1;
            }
        }
        if (ride.days.includes(end_date.day()))
            count = count + 1;

        ride.totalTripsPlanned = count;
    }

    if (ride.cost == -1) {
        // calculate cost;
        const basePrice = 53;
        const ratePerKm = 7;
        const rideTimeChargePerMin = 0.8;
        const distanceInKm = ride.distance;
        const timeInMin = ride.duration;
        const distanceCharge = ratePerKm * distanceInKm;
        const rideTimeCharge = rideTimeChargePerMin * timeInMin;
        let perDayCost = basePrice + distanceCharge + rideTimeCharge;

        const withoutDiscountCost = perDayCost * ride.totalTripsPlanned;
        if (ride.sharing_allowed == true) {
            // 10% discount
            perDayCost *= 0.9;
        } else {
            // 5% discount
            perDayCost *= 0.95;
        }

        const cost = perDayCost * ride.totalTripsPlanned;
        // end logic

        ride.bill_no_discount = withoutDiscountCost;
        ride.per_ride_avg = perDayCost;
        ride.cost = cost;
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ubereveryday5@gmail.com',
            pass: 'Uber@123'
        }
    });

    const user = await User.findById(ride.owner);
    const email = user.email;
    const name = user.name;
    const mailOptions = {

        from: 'ubereveryday5@gmail.com',
        to: email,
        subject: 'Uber EveryDay subscription Ride id: ' + ride._id,
        text: 'Congratulations ' + name + '! your subscription has been booked successfully.'
    };
    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent to ' + email);
        }
    });

    next();
});

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;