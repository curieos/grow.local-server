const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const plantsRoutes = require("./routes/plants")

const app = express();

mongoose.connect('mongodb://localhost:27017/mean?authSource=admin', { user: "superuser", pass: "StronkPass" }).then(() => {
	console.log("Connected to Database");
}).catch((error) => {
	console.log("Connection to db failed!");
	console.log(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
	next();
});

app.use("/api/plants", plantsRoutes);

module.exports = app;