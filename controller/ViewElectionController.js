const ElectionService = require('../services/ElectionService');

const ViewElection = async (req, res) => {
  const { ElectionId } = req.params;
  const Election = await ElectionService.ViewElection(ElectionId);
  const ElectionObj = {};

  if (!Election) {
    return res.status(200).json({
      error: {
        msg: 'Election Details doesnt Exist',
      },
    });
  }
  ElectionObj.id = Election.id;
  ElectionObj.UserId = Election.UserId;
  ElectionObj.Name = Election.name;
  ElectionObj.Date = Election.date;
  ElectionObj.Election_level = Election.election_level;
  ElectionObj.Location = Election.location;
  ElectionObj.Active_period = Election.active_period;

  return res.status(201).json(

    ElectionObj,
  );
};

module.exports = ViewElection;
