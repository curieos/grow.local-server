const express = require("express");
const path = require("path");
const Plant = require("../sequelize").Plant;

const router = express.Router();

var plantList = [];

let UpdatePlantList = new Promise(function (resolve, reject) {
	Plant.findAll().then(plants => {
		let newList = [];
		for (let plant of plants) {
			let newPlant = { _id: plant._id, name: plant.name };
			newList.push(newPlant);
		}
		plantList = [...newList];
	});
	resolve();
});

router.get("", (req, res, next) => {
	UpdatePlantList.then(
		res.status(200).json({
			message: "Plants Fetched Successfully",
			plants: plantList,
		}));
});

router.post("", (req, res, next) => {
	const plant = { _id: req.body._id, name: req.body.name };
	plantList.push(plant);
	//UpdatePlantList();
});

module.exports = router;