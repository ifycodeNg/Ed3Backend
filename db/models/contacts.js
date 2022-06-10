module.exports = (sequelize, type) => {
  const fields = {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    directory_id: {
      type: type.INTEGER,
      notEmpty: true,
      unique: false,
    },
    mobileNumber: {
      type: type.BIGINT,
      unique: false,
      allowNull: false
    },
  };
  return sequelize.define('contacts', fields);
};
