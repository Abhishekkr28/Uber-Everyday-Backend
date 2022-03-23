const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://Tester:admin123@cluster0.5ekkj.mongodb.net/Sample?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch(err => console.log(err));