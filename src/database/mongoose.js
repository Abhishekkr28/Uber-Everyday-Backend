const mongoose = require('mongoose');

// connect to mongodb

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to db"))
    .catch(err => console.log(err));