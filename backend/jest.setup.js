const db = require('./src/models').default;

module.exports = async () => {
  await db.sequelize.sync({ force: true });
};