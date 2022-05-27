const User = require('../db/sequelize');
const bcrypt = require('bcrypt');

let userFound;
const crypto = require('crypto');

let token;

const checkUser = async (req) => {
  const email = req;

  userFound = User.User.findAll({
    where: {
      email,
    },
  });

  const AwaituserFound = await userFound;

  if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
  ) {
    return false;
  }

  return userFound;
};

const checkUserById = async (id) => {
  const Id = id;

  FindUserById = User.User.findAll({
    where: {
      id: Id,
    },
  });

  const AwaituserFound = await FindUserById;

  if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
  ) {
    return false;
  }

  return FindUserById;
};

const CreateUser = async (req) => {
  const { email, password } = req.body;
  const new_password = bcrypt.hashSync(password, 10);
  token = crypto.randomBytes(32).toString('hex');
  const query = await User.User.create({
    email,
    password: new_password,
    confirmationToken: token,
  });
  const { id } = query.dataValues;
  return {

    token,
    id,

  };
};

module.exports = {
  checkUser,
  CreateUser,
  checkUserById,

};
