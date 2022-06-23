const ElectionService = require('../services/ElectionService');

const ListAllElection = async (req, res) => {
  const AllElections = await ElectionService.getAllElections();
  const Elections = [];

  if (!AllElections) {
    return res.status(200).json({});
  }
  const elen = AllElections.length;
  for (let i = 0; i < elen; i++) {
    const ElectionObj = {};
    const EachElection = AllElections[i];
    ElectionObj.id = EachElection.id;
    ElectionObj.createdBy = EachElection.createdBy;
    ElectionObj.electionName = EachElection.electionName;
    ElectionObj.dateOfElection = EachElection.dateOfElection;
    ElectionObj.electionType = EachElection.electionType;
    ElectionObj.location = EachElection.location;
    ElectionObj.level = EachElection.level;

    Elections.push(ElectionObj);
  }

  res.status(201).json(Elections);
};
module.exports = ListAllElection;
