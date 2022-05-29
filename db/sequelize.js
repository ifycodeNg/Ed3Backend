/* eslint-disable no-console */
const Sequelize = require('sequelize');

const userModel = require('./models/users');
const usermetaModel = require('./models/user_meta');

const config = require('../config/secret');

const sequelize = new Sequelize('ed3db', config.dbUser, config.dbPassword, {
  host: 'localhost',
  dialect: 'mariadb',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {})
  .catch((err) => {
    if (err) {
      throw err;
    }
  });

const User = userModel(sequelize, Sequelize);
const Usermeta = usermetaModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  // console.clear();
  console.log('Database & tables created Successfully!');
});

module.exports = {
  User,
  Usermeta,

};
