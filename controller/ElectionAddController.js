const ElectionService = require('../services/ElectionService');

const AddElection = async (req, res) => {
  const {
    electionName, dateOfElection, level, electionType, location,
  } = req.body;

  const data = {
    electionName,
    dateOfElection,
    level,
    electionType,
    location,
  };

  const createElection = await ElectionService.AddElection(data);

  if (createElection) {
    return res.status(201).json({
      msg: true,
    });
  }

  if (!createElection) {
    return res.status(200).json({
      msg: false,
    });
  }

  return true;
};

module.exports = AddElection;
