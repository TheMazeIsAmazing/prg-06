console.log("hello WERELD")

const express = require("express");
const app = express();

//Mongoose import stuff
const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/people";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//end mongoose import stuff

//Import .env
require('dotenv').config();

//Import people router
const routerPeople = require("./epic_routes/routes_people");
app.use('/people', routerPeople);

//listen to specific port
app.listen(8000, () => {
    console.log("Yay, your Server is Runnign");
});