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
      unique: false,
    },
    date: {
      type: type.DATEONLY,
      notEmpty: true,
      unique: false,
    },
    location: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    active_period: {
      type: type.INTEGER,
      notEmpty: true,
      unique: false,
    },
    election_level: {
      type: type.ENUM('nationwide', 'State', 'FC', 'SD', 'LGA', 'ward', 'Unit'),
    },

  };
  return sequelize.define('elections', fields);
};
