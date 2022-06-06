const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const ElectionService = require('../services/ElectionService');

const AddElection = async (req, res) => {
  const { authorization } = req.headers;
  const {name, election_level, date,
    active_period,
    location} = req.body
  if (!authorization) {
    return res.status(200).json({
      msg: 'Please Login',
    });
  }

  const token = authorization.split(' ')[1];

  const { userID } = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
  const data = {
    name,
    date,
    election_level,
    location,
    active_period,
    userID

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
