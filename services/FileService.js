const sequelize = require('../db/sequelize');

const GetAllFiles = async () => {
  const getFiles = sequelize.File.findAll({

  }).then((fileFound) => {
    if (!fileFound) {
      return false;
    }

    if (fileFound) {
      return fileFound;
    }
    return fileFound;
  })
    .catch((err) => {
      throw err;
    });

  const filesFound = await getFiles;
  return filesFound;
};

module.exports = {
    GetAllFiles,
};
