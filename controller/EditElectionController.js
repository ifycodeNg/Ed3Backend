const { UpdateElection } = require('../services/ElectionService');

const EditElection = async (req, res) => {
  const { electionId } = req.params;
  const {
    name, election_level, date,
    active_period,
    location,
  } = req.body;

  const data = {
    name,
    date,
    election_level,
    location,
    active_period,
  };
  const Update = await UpdateElection(data, electionId);
  if (!Update) {
    res.status(200).json({
      success: false,
    });
  } else {
    res.status(201).json({
      success: true,
    });
  }
};

module.exports = EditElection;
