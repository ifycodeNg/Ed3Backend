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
    key: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    token: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
  };
  return sequelize.define('Token', fields);
};
