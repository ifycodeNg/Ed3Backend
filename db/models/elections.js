module.exports = (sequelize, type) => {
  const fields = {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    electionName: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    electionType: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    dateOfElection: {
      type: type.DATEONLY,
      notEmpty: true,
      unique: false,
    },
    level: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    location: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },

  };
  return sequelize.define('elections', fields);
};
