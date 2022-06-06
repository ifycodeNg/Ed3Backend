const ElectionService = require('../services/ElectionService');

const ListAllElection = async (req, res) => {
  const AllElections = await ElectionService.getAllElections();
  const Elections = [];

  if (!AllElections) {
    return res.status(200).json({});
  }
  for (let i = 0; i < AllElections.length; i++) {
    const ElectionObj = {};
    const EachElection = AllElections[i];
    ElectionObj.id = EachElection.id;
    ElectionObj.UserId = EachElection.userId;
    ElectionObj.Name = EachElection.name;
    ElectionObj.Date = EachElection.date;
    ElectionObj.Location = EachElection.location;
    ElectionObj.ActivePeriod = EachElection.active_period;
    ElectionObj.ElectionLevel = EachElection.election_level;

    Elections.push(ElectionObj);
  }

  res.status(201).json(Elections);
};
module.exports = ListAllElection;
