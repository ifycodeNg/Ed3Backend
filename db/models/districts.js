module.exports = (sequelize, type) => {
  const fields = {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stateID: {
      type: type.INTEGER,
      notEmpty: true,
    },
    districtCode: {
      type: type.STRING,
      notEmpty: true,
    },
    districtName: {
      type: type.STRING,
      notEmpty: true,
    },
    composition: {
      type: type.STRING,
      notEmpty: true,
    },
  };
  return sequelize.define('districts', fields, { timestamps: false });
};
