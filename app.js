const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./models/schema1.js').User;
const RideSchema = require('./models/schema1.js').Ride;
// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://Tester:admin123@cluster0.5ekkj.mongodb.net/Details?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to db"))
    .catch(err => console.log(err));
const Rider = new RideSchema({
    source: {
        place_name: "Dwarka",
        place_cord: [0.1232, 1.123]
    },
    destination: {
        place_name: "New Delhi",
        place_cord: [0.2345, 1.113]
    },
    timing: "8:00 AM",
    start_date: "2022-03-09",
    end_date: "2022-03-30"
})
const User = new userSchema({
    name: "tester123",
    phone: 2123427890,
    email: "test@123.com",
    ride: [Rider]

})
Rider.save();
User.save();