const express = require("express");
const path = require("path");
const Plant = require("../sequelize").Plant;

const router = express.Router();

var plantList = [];

function UpdatePlantList() {
	return new Promise((resolve, reject) => {
		Plant.findAll().then(plants => {
			let newList = [];
			for (let plant of plants) {
				let newPlant = { id: plant.id, name: plant.name };
				newList.push(newPlant);
			}
			plantList.length = newList.length;
			plantList = [...newList];
			resolve();
		});
	});
}
router.get("", (req, res, next) => {
	UpdatePlantList().then((response) => {
		res.status(200).json({
			message: "Plants Fetched Successfully",
			plants: plantList,
		})
	});
});

router.post("", (req, res, next) => {
	console.log(req.body);
	Plant.create({ name: req.body.plantName }).then(plant => {
		res.status(201).json({ message: "Successfuly Added Plant" });
	});
	//UpdatePlantList();
});

module.exports = router;