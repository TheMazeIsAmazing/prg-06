console.log("hello WERELD")

const express = require("express");

const app = express();

//Mongoose import stuff
// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/people";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//end mongoose import stuff

//Import .env
require('dotenv').config();

//Import people router
const routerPeople = require("./epic_routes/routes_people");
app.use('/people', routerPeople);

app.listen(8000, () => {
    console.log("Yay, your Server is Runnign");
});