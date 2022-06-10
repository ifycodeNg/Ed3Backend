const ElectionService = require('../services/ElectionService');

const ViewElection = async (req, res) => {
  const { electionId } = req.params;
  const Election = await ElectionService.ViewElection(electionId);
  const ElectionObj = {};

  if (!Election) {
    return res.status(200).json({
      error: {
        msg: 'Election Details doesnt Exist',
      },
    });
  }
  ElectionObj.id = Election.id;
  ElectionObj.userId = Election.userId;
  ElectionObj.name = Election.name;
  ElectionObj.date = Election.date;
  ElectionObj.Election_level = Election.election_level;
  ElectionObj.location = Election.location;
  ElectionObj.active_period = Election.active_period;

  return res.status(201).json(

    ElectionObj,
  );
};

module.exports = ViewElection;
