// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('performance_wear_store', 'root', 'new_password', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected!'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;

