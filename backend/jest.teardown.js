const db = require('./src/models').default;

module.exports = async () => {
  await db.sequelize.close();
};
