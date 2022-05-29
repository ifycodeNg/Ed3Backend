const Model = require('../db/sequelize');

const ProfileCreate = async (req, Id) => {
  for (const key in req.body) {
    const query = await Model.Usermeta.create({
      userID: Id,
      key,
      value: req.body[key],

    });
  }

  return {

    sucess: true,

  };
};
const ProfileLookup = async (Id) => {
  userFound = Model.Usermeta.findAll({
    raw: true,
    where: {
      userID: Id,
      key: 'isProfileComplete',
    },
  });
  const AwaituserFound = await userFound;

  if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
  ) {
    return false;
  }

  return AwaituserFound;
};

const UpdateProfile = async (Id) => {
  const id = Id;
  userFound = Model.Usermeta.update(
    {
      value: 1,
    },
    {
      where: {
        id,
      },

    },
  );
};

const getInfo = async (Id, key) => {
  userFound = Model.Usermeta.findAll({
    raw: true,
    where: {
      userID: Id,
      key,
    },
  });
  const AwaituserFound = await userFound;
  if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
  ) {
    return null;
  }

  return AwaituserFound[0].value;
};
module.exports = {
  ProfileCreate, ProfileLookup, UpdateProfile, getInfo,
};
