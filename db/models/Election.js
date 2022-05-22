module.exports = (sequelize, type) => {
    const fields = {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: type.STRING,
        notEmpty: true,
        unique: false,
      },
      Date: {
        type: type.DATEONLY,
        notEmpty: true,
        unique: false,
      },
      Location: {
        type: type.STRING,
        notEmpty: true,
        unique: false,
      },
      Active_period: {
        type: type.INTEGER,
        notEmpty: true,
        unique: false,
      },
      Election_level:{
          type: type.ENUM("nationwide", "State", "FC","SD","LGA","ward","Unit")
      }


    };
    return sequelize.define('Election', fields);
  };
  