const mongoose = require('mongoose');

// connect to mongodb
const dbURI = "mongodb+srv://Tester:admin123@cluster0.5ekkj.mongodb.net/Details?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to db"))
    .catch(err => console.log(err));