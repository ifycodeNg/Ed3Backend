module.exports = (sequelize, type) => {
  const fields = {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: type.INTEGER,
      notEmpty: true,
      unique: false,
    },
    fileName: {
      type: type.STRING,
      notEmpty: true,
      unique: true,
    },
    path: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },

  };
  return sequelize.define('files', fields);
};
