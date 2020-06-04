module.exports = (sequelize, type) => {
  return sequelize.define('module', {
    name: {
      type: type.STRING,
      allowNull: false
    },
    ip: {
      type: type.STRING,
      allowNull: false,
      validate: { isIPv4: true }
    }
  }, {
    timestamps: false
  })
}
