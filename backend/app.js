const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require("node-env-file");

env("./.env");

const plantsRoutes = require("./routes/plants")

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(() => {
	console.log("Connected to Database");
}).catch((error) => {
	console.log("Connection to db failed!");
	console.log(error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "..", "dist", "grow-local")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
	next();
});

app.use("/api/plants", plantsRoutes);
app.use((req, res, next) => {
	const _path = path.join(__dirname, "..", "dist", "grow-local", "index.html");
	res.sendFile(_path);
});

module.exports = app;