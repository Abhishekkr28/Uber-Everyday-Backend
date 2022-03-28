const express = require("express");
const morgan = require("morgan");

require("./src/database/mongoose.js");
const Ride = require("./src/routers/ride.js");
const User = require("./src/routers/user.js");

// express app
const app = express();
app.listen(3000);
app.use(express.json());
app.use(morgan("tiny"));
app.use(Ride);
app.use(User);
