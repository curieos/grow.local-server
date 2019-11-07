const express = require("express");
const path = require("path");
const Module = require("../sequelize").Module;

const router = express.Router();

var moduleList = [];
var rawModuleList = [{name: "E5A2B4BTJK348SMCX0", ip: "192.168.0.108"}];

function UpdateModuleList() {
	return new Promise((resolve, reject) => {
		Module.findAll().then(modules => {
			let newList = [];
			for (let module of modules) {
				let newModule = { id: module.id, name: module.name };
				newList.push(newModule);
			}
			moduleList.length = newList.length;
			moduleList = [...newList];
			resolve();
		});
	});
}

router.get("", (req, res, next) => {
	UpdateModuleList().then((response) => {
		res.status(200).json({
			message: "Modules Fetched Successfully",
			modules: moduleList,
		})
	});
});

router.post("", (req, res, next) => {
	Module.create({ name: req.body.name, ip: req.body.ip }).then(module => {
		res.status(201).json({ message: "Successfuly Added Module" });
	});
});

router.delete("/:id", (req, res, next) => {
	Module.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		res.status(201).json({ message: "Successfully Deleted Module" });
	});
});

router.get("/raw", (req, res, next) => {
	res.status(200).json({
		message: "Raw Modules Fetched Successfully",
		modules: rawModuleList
	});
});

module.exports = router;