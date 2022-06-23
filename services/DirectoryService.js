const sequelize = require('../db/sequelize');

const GetAllDirectoriesGroupedByFileID = async () => {
  const directoryFound = sequelize.Directory.findAll({
    group: ['fileID'],
  }).then((dirFound) => {
    if (!dirFound) {
      return false;
    }

    if (dirFound) {
      return dirFound;
    }
    return dirFound;
  })
    .catch((err) => {
      throw err;
    });

  const dirsFound = await directoryFound;
  return dirsFound;
};

const GetAllDirectoryWithFileID = async (fileID) => {
  const directoryFound = sequelize.Directory.findAll({
    where: {
      fileID,
    },

  }).then((dirFound) => {
    if (!dirFound) {
      return false;
    }

    if (dirFound) {
      return dirFound;
    }
    return dirFound;
  })
    .catch((err) => {
      throw err;
    });

  const dirsFound = await directoryFound;
  return dirsFound;
}

const AddDirectory = async (data) => {
  const nMeta = sequelize.Directory.create(data)
    .then((newDir) => {
      if (!newDir) {
        return false;
      }

      if (newDir) {
        return newDir;
      }
      // return newDir;
    })
    .catch((err) => {
      throw err;
    });

  const output = await nMeta;
  return output;
};

const AddFilePath = async (userID, fileName, path) => {
  const data = {
    userID,
    fileName,
    path,
  };
  const nMeta = sequelize.File.create(data)
    .then((newFile) => {
      if (!newFile) {
        return false;
      }

      if (newFile) {
        return newFile;
      }
      // return newFile;
    })
    .catch((err) => {
      throw err;
    });

  const output = await nMeta;
  return output;
};

const getAllDirectory = async () => {
  const directoryFound = sequelize.Directory.findAll().then((dirFound) => {
    if (!dirFound) {
      return false;
    }

    if (dirFound) {
      return dirFound;
    }
    return dirFound;
  })
    .catch((err) => {
      throw err;
    });

  const dirsFound = await directoryFound;
  return dirsFound;
};

module.exports = {
  GetAllDirectoriesGroupedByFileID,
  GetAllDirectoryWithFileID,
  AddDirectory,
  AddFilePath,
  getAllDirectory,
};
