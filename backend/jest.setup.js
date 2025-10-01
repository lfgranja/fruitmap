const db = require('./src/models').default;

module.exports = async () => {
  try {
    await db.sequelize.sync({ force: true });
  } catch (error) {
    console.error('Error during test database setup:', error);
    throw error;
  }
};