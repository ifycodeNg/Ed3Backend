const Model = require('../db/sequelize');

const AddElection = async (data) => {
  const query = Model.Election.create(
    data,
  );
  query.then((Election) => {
    if (!Election) {
      return false;
    }

    if (Election) {
      return Election;
    }
  }).catch((err) => {
    throw err;
  });
  const output = await query;
  return output;
};
const ViewElection = async (id) => {
  const ElectionFound = Model.Election.findOne({
    where: {
      id,
    },

  });
  ElectionFound.then((ElectionResult) => {
    if (!ElectionResult) {
      return false;
    }

    if (ElectionResult) {
      const ElectionInfo = ElectionResult.get();
      return ElectionInfo;
    }
    return ElectionInfo;
  })
    .catch((err) => {
      throw err;
    });
  const output = await ElectionFound;
  return output;
};
const getAllElections = async () => {
  const ElectionFound = Model.Election.findAll({

  });
  ElectionFound.then((ElectionResult) => {
    if (!ElectionResult) {
      return false;
    }

    if (ElectionResult) {
      return true;
    }
    return ElectionResult;
  })
    .catch((err) => {
      throw err;
    });

  const awaitElectionFound = await ElectionFound;
  return awaitElectionFound;
};

const UpdateElection = async (data, id) => {
  const query = Model.Election.update(
    data,
    {
      where: {
        id,
      },
    },
  );
  query.then((Update) => {
    if (!Update) {
      return false;
    }

    if (Update) {
      return Update;
    }
  })
    .catch((err) => {
      throw err;
    });
  const output = await query;
  return output;
};
module.exports = {
  AddElection, getAllElections, UpdateElection, ViewElection,
};
