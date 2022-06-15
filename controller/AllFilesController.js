const FileService = require('../services/FileService');

const ListAllFiles = async (req, res) => {
  const getFiles = await FileService.GetAllFiles();

  if (getFiles) {
    res.type('application/json');
    return res.status(201).json(getFiles);
  }

  res.type('application/json');
  return res.status(200).json({ msg: 'No File' });
};

module.exports = ListAllFiles;
