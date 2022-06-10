/* eslint-disable no-console */
const Sequelize = require('sequelize');

const userModel = require('./models/users');
const usermetaModel = require('./models/user_meta');
const ElectionModel = require('./models/elections');
const DirectoryModel = require('./models/directory');
const TokenModel = require('./models/token');
const FileModel = require('./models/file');
const ContactModel = require('./models/contacts')
const config = require('../config/secret');

const sequelize = new Sequelize(
  'ed3db',
  config.dbUser,
  config.dbPassword,
  {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

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
const Directory = DirectoryModel(sequelize, Sequelize);
const Election = ElectionModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);
const File = FileModel(sequelize, Sequelize);
const Contact = ContactModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  // console.clear();
  // console.log('Database & tables created Successfully!');
});

module.exports = {
  User,
  sequelize,
  File,
  Contact,
  Usermeta,
  Directory,
  Token,
  Election,
};
