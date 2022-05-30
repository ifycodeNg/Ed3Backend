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
    constituencyCode: {
      type: type.STRING,
      notEmpty: true,
    },
    constituencyName: {
      type: type.STRING,
      notEmpty: true,
    },
    composition: {
      type: type.STRING,
      notEmpty: true,
    },
  };
  return sequelize.define('fconstituencies', fields, { timestamps: false });
};
