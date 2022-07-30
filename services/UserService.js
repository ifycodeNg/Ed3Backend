const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sequelize = require('../db/sequelize');

const checkUser = async (email) => {
  const userFound = sequelize.User.findOne({
    where: {
      email,
    },
  }).then((user) => {
    if (!user) {
      return false;
    }

    if (user) {
      const userDetails = user.get();
      return userDetails;
    }
    return user;
  })
    .catch((err) => {
      throw err;
    });

  const AwaituserFound = await userFound;

  return AwaituserFound;
};

const checkUserById = async (id) => {
  const FindUserById = sequelize.User.findOne({
    where: {
      id,
    },
  }).then((user) => {
    if (!user) {
      return false;
    }

    if (user) {
      const userDetails = user.get();
      return userDetails;
    }
    return user;
  })
    .catch((err) => {
      throw err;
    });

  const AwaituserFound = await FindUserById;

  return AwaituserFound;
};

const getAllUsers = async () => {
  const userFound = sequelize.User.findAll().then((users) => {
    if (!users) {
      return false;
    }

    if (users) {
      return users;
    }
  })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  const AwaituserFound = await userFound;

  return AwaituserFound;
};

const CreateUser = async (req) => {
  const { email, password } = req.body;
  const newPassword = bcrypt.hashSync(password, 10);
  const metaObj = {};
  metaObj.role = 'user';
  metaObj.isProfileComplete = 0;

  const token = crypto.randomBytes(32).toString('hex');

  const data = {
    email,
    password: newPassword,
    confirmationToken: token,
  };

  const query = await sequelize.User.create(data).then((newUser) => {
    if (!newUser) {
      return false;
    }

    if (newUser) {
      const userInfo = newUser.get();
      return userInfo;
    }
    return newUser;
  })
    .catch((err) => {
      throw err;
    });


  // if (query) {

  //   const { id } = query;

  //   const role = 'user';
  //   const isProfileComplete = 0;

  //   const 

    
  // }

 

  const { id } = query.dataValues;
  for (const key in metaObj) {
    const meta_query = await User.Usermeta.create({
      userID: id,
      key,
      value: metaObj[key],

    });
  }

  return {

    token,
    id,

  };
};

const updateUser = async (id, key, val) => {
  const Udate = sequelize.User.update(
    {
      [key]: val,
    },
    {
      where: {
        id,
      },
    },
  )
    .then((uMeta) => {
      if (!uMeta) {
        return false;
      }

      if (uMeta) {
        return true;
      }
      return uMeta;
    })
    .catch((err) => {
      throw err;
    });

  const output = await Udate;
  return output;
};

const getUserPassword = async (uid) => {
  const metaAction = sequelize.User.findOne({
    where: {
      id: uid,
    },
  })
    .then((user) => {
      if (!user) {
        return false;
      }

      if (user) {
        const userDetails = user.get();
        return userDetails;
      }
      return user;
    })
    .catch((err) => {
      throw err;
    });

  const meA = await metaAction;

  return meA.password;
};

module.exports = {
  checkUser,
  CreateUser,
  checkUserById,
  // checkMeta,
  getAllUsers,
  updateUser,
  getUserPassword,
  // create,

};
