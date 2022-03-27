const express = require('express');
require('./database/mongoose.js');
const currentRides = require("./routers/currentrides.js");
const newUser = require("./routers/newuser.js");
const newRide = require("./routers/newride.js");
const rideStatus = require("./routers/ridestatus.js");
const deleteRide = require("./routers/deleteride.js");
// express app
const app = express();
app.listen(3000);

app.use(express.json());
app.use(newUser);
app.use(newRide);
app.use(currentRides);
app.use(rideStatus);
app.use(deleteRide);