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
    local_government_id: {
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
  };
  return sequelize.define('registration_areas', fields, { timestamps: false });
};
