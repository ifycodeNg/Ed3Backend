module.exports = (sequelize, type) => {
  const fields = {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      notEmpty: true,
    },
    abbreviation: {
      type: type.STRING,
      notEmpty: true,
    },
    state_id: {
      type: type.INTEGER,
      notEmpty: true,
    },
    registered_voters: {
      type: type.INTEGER,
      notEmpty: true,
    },
    polling_units: {
      type: type.INTEGER,
      notEmpty: true,
    },
    gps_lat: {
      type: type.STRING,
      notEmpty: true,
    },
    gps_lon: {
      type: type.STRING,
      notEmpty: true,
    },
  };
  return sequelize.define('local_governments', fields, { timestamps: false });
};
