module.exports = (sequelize, type) => {
  return sequelize.define('plant', {
    name: {
      type: type.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}
