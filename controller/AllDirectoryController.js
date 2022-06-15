const DirectoryService = require('../services/DirectoryService');

const ListAllDirectories = async (req, res) => {
  const getDirs = await DirectoryService.GetAllDirectoriesGroupedByFileID();

  if (getDirs) {
    res.type('application/json');
    return res.status(201).json(getDirs);
  }

  res.type('application/json');
  return res.status(200).json({ msg: 'Wrong Template' });
};

module.exports = ListAllDirectories;
