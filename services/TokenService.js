const Model = require('../db/sequelize');

const SaveToken = async (Token, Id, Key) => {
  const query = await Model.Token.create({
    userID: Id,
    token: Token,
    key: Key,
  });
};

const findUserByToken = async (Id, token) => {
  TokenFound = Model.Token.findAll({
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
