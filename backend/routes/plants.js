const express = require("express");

const router = express.Router();

var plants = [
	{ _id: "", name: "Violets" },
	{ _id: "", name: "Bell Peppers" },
	{ _id: "", name: "Banana Peppers" },
	{ _id: "", name: "Tomatoes" },
];

router.get("", (req, res, next) => {
	res.status(200).json({
		message: "Plants Fetched Successfully",
		plants: plants,
	})
});

router.post("", (req, res, next) => {
	const plant = { _id: req.body._id, name: req.body.name };
	plants.push(plant);
});

module.exports = router;