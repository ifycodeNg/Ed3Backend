
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
      fName: {
        type: type.STRING,
        notEmpty: true,
        unique: false,
      },
      lName: {
        type: type.STRING,
        notEmpty: true,
        unique: false,
      },
     
      otherNames: {
        type: type.STRING,
        notEmpty: true,
        unique: false,
      },
      Role: {
        notEmpty: true,
        unique: false,
        type: type.ENUM("supervisor", "monitor", "Tech support")

      },
      Rank: {
        notEmpty: true,
        unique: false,
        type: type.ENUM("REC", "Director", "Staff")

      }
    };
    return sequelize.define('Directory', fields);
  };
  