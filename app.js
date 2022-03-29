const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("./src/database/mongoose.js");
const Ride = require("./src/routers/ride.js");
const User = require("./src/routers/user.js");
const Trip = require("./src/routers/trip.js");
const Pdf = require("./src/routers/createPdf.js");

// express app
const app = express();
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Running on port " + port);
});
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(Ride);
app.use(User);
app.use(Trip);
app.use(Pdf);
