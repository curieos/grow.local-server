const Sequelize = require("sequelize");
const PlantModel = require("./models/plant");
const ModuleModel = require("./models/module");

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db.sqlite'
});

const Plant = PlantModel(sequelize, Sequelize);
const Module = ModuleModel(sequelize, Sequelize);

Plant.belongsTo(Module,{
	onDelete: "CASCADE"
});

sequelize.sync()
	.then(() => {
		console.log(`Database & tables created!`)
	})

module.exports = {
	Plant,
	Module,
}