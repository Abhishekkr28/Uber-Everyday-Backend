const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reqString = {
    type: String,
    required: true

}
const rideSchema = new Schema({
    phone: {
        type: Number,
        required: true
    },
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
    total_traveller: {
        type: Number,
        max: 4,
        required: true
    },
    ride_info: {
        type: [{
            ride_date: {
                type: Date,
                required: true
            },
            ride_status: {
                type: Number,
                required: true
            }
        }]

    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
}, { timestamps: true })

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;