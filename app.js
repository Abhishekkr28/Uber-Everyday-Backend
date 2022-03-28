const express = require("express");
const morgan = require("morgan");

require("./src/database/mongoose.js");
const Ride = require("./src/routers/ride.js");
const User = require("./src/routers/user.js");
const Trip = require("./src/routers/trip.js");

// express app
const app = express();
app.listen(3001, () => {
  console.log("Running on port 3001");
});
app.use(express.json());
app.use(morgan("tiny"));
app.use(Ride);
app.use(User);
app.use(Trip);
