const mongoose = require('mongoose');
const rideSchema = require('./ride.js').rideSchema;
const Schema = mongoose.Schema;
const reqString = {
    type: String,
    required: true

}
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
module.exports = User;