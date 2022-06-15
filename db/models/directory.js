module.exports = (sequelize, type) => {
  const fields = {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eid: {
      type: type.INTEGER,
      notEmpty: true,
      unique: false,
    },
    fileID: {
      type: type.INTEGER,
      notEmpty: true,
      unique: false,
    },
    firstName: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    lastName: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    otherNames: {
      type: type.STRING,
      notEmpty: true,
      unique: false,
    },
    role: {
      notEmpty: true,
      unique: false,
      type: type.ENUM('supervisor', 'monitor', 'Tech support'),

    },
    rank: {
      notEmpty: true,
      unique: false,
      type: type.STRING,

    },
    deploymentLevel: {
      notEmpty: true,
      unique: false,
      type: type.STRING,

    },
    deploymentLocation: {
      notEmpty: true,
      unique: false,
      type: type.STRING,

    },
    createdBy: {
      type: type.INTEGER,
      notEmpty: true,
      unique: false,
    },
  };
  return sequelize.define('directory', fields);
};
