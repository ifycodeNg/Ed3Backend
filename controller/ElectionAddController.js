const ElectionService = require('../services/ElectionService');

const AddElection = async (req, res) => {
  const {
    electionName, dateOfElection, level, electionType, location,
  } = req.body;
  
  const { uid } = req.body;
  const {name, election_level, date,
    active_period,
    location} = req.body

  const data = {
    electionName,
    dateOfElection,
    level,
    electionType,
    location,
    active_period,
    userId:uid

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
