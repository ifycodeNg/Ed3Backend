const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sequelize = require('../db/sequelize');

let token;

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
  const userFound = sequelize.User.findAll().then((findCans) => {
    if (!findCans) {
      return false;
    }

    if (findCans) {
      return findCans;
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

  token = crypto.randomBytes(32).toString('hex');

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
// const checkMeta = async (UserId) => {
//   FindUserById = User.Usermeta.findAll({
//     where: {
//       userID: UserId,
//     },
//   });

//   const AwaituserFound = await FindUserById;

//   if (Array.isArray(AwaituserFound) && AwaituserFound.length == 0
//   ) {
//     return false;
//   }

//   return FindUserById;
// };
// const create = async (req) => {
//   const { email, password } = req.body;
//   const UserInfo = req.body;
//   const newPassword = bcrypt.hashSync(password, 10);
//   const metaObj = {};
//   metaObj.role = 'user';
//   metaObj.isProfileComplete = 1;

//   metaObj.firstName = UserInfo.firstName;
//   metaObj.lastName = UserInfo.lastName;
//   metaObj.middleName = UserInfo.middleName;
//   metaObj.telephone = UserInfo.telephone;
//   metaObj.gender = UserInfo.gender;

//   token = crypto.randomBytes(32).toString('hex');
//   const query = await User.User.create({
//     email,
//     password: newPassword,
//     confirmationToken: token,
//     isConfirmed: 1,
//   });

//   const { id } = query.dataValues;
//   for (const key in metaObj) {
//     const meta_query = await User.Usermeta.create({
//       userID: id,
//       key,
//       value: metaObj[key],

//     });
//   }
// };

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

module.exports = {
  checkUser,
  CreateUser,
  checkUserById,
  // checkMeta,
  getAllUsers,
  updateUser,
  // create,

};
