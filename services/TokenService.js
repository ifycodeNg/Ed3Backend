const sequelize = require('../db/sequelize');

const SaveToken = async (token, userID, key) => {
  const data = {
    userID,
    key,
    token,
  };

  const nMeta = sequelize.Token.create(data)
    .then((newTkn) => {
      if (!newTkn) {
        return false;
      }

      if (newTkn) {
        return true;
      }
      return newTkn;
    })
    .catch((err) => {
      throw err;
    });

  const output = await nMeta;
  return output;
};

const findUserByToken = async (Id, token) => {
  TokenFound = sequelize.Token.findAll({
    where: {
      userID: Id,
      token,
    },
  });

  const AwaitTokenFound = await TokenFound;

  if (Array.isArray(AwaitTokenFound) && AwaitTokenFound.length == 0
  ) {
    return false;
  }

  return TokenFound;
};
module.exports = { SaveToken, findUserByToken };
