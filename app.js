const express = require('express');
require('./src/database/mongoose.js');
const newUser = require("./src/routers/newuser.js");
const newRide = require("./src/routers/newride.js");
const rideStatus = require("./src/routers/ridestatus.js");
// express app
const app = express();
app.listen(3000);
app.use(express.json());
app.use(newUser);
app.use(newRide);
app.use(rideStatus);