module.exports = (sequelize, type) => {
  const fields = {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country_id: {
      type: type.INTEGER,
      notEmpty: true,
    },
    name: {
      type: type.STRING,
      notEmpty: true,
    },
    abbreviation: {
      type: type.STRING,
      notEmpty: true,
    },
    code: {
      type: type.STRING,
      notEmpty: true,
    },
    lat: {
      type: type.STRING,
      notEmpty: true,
    },
    lng: {
      type: type.STRING,
      notEmpty: true,
    },
    mapcode: {
      type: type.STRING,
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
    geo_political_zone_id: {
      type: type.INTEGER,
      notEmpty: true,
    },
  };
  return sequelize.define('states', fields, { timestamps: false });
};