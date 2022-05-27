const Model = require('../db/sequelize');

const uploadFile = async (userId, path) => {
  const query = await Model.Usermeta.create({
    userID: userId,
    key: 'profilePic',
    value: path,

  });

  return query;
};

module.exports = uploadFile;
