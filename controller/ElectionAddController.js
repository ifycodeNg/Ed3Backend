const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const ElectionService = require('../services/ElectionService');

const AddElection = async (req, res) => {
  const { uid } = req.body;
  const {name, election_level, date,
    active_period,
    location} = req.body

  const data = {
    name,
    date,
    election_level,
    location,
    active_period,
    userId:uid

  };

  const AddElection = await ElectionService.AddElection(data);

  if (!AddElection) {
    return res.status(200).json({
      success: false,
    });
  }

  return res.status(201).json({
    success: true,
  });
};

module.exports = AddElection;
