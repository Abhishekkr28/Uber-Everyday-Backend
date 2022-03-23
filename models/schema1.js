const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = {
    type: String,
    required: true

}
const rideSchema = new Schema({
    source: {
        place_name: reqString,
        place_cord: {
            type: [Number, Number],
            required: true
        }
    },
    destination: {
        place_name: reqString,
        place_cord: {
            type: [Number, Number],
            required: true
        }
    },
    timing: reqString,
    // total_rides
    // weekly_freq
    completed_rides: {
        type: Number,
        default: 0,
        required: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
}, { timestamps: true })
const userSchema = new Schema({
    name: reqString,
    age: {
        type: Number
    },
    phone: {
        type: Number,
        required: true
    },
    email: reqString,
    ride: {
        type: [rideSchema],
        required: true
    }


}, { timestamps: true })
const User = mongoose.model('User', userSchema);
const Ride = mongoose.model('Ride', rideSchema);
module.exports = { User, Ride };