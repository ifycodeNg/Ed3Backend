const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('../Utility/UserService');
const secret = require('../config/secret');
const ProfileService = require('../Utility/ProfileService');

const Login = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const UserFound = await UserService.checkUser(email);

  if (UserFound[0] == undefined) {
    return res.status(200).json({
      errors: {
        msg: 'Invalid Credential',
      },
    });
  }

  const isMatch = await bcrypt.compare(password, UserFound[0].password);
  if (!isMatch) {
    return res.status(200).json({
      errors: {
        msg: 'Invalid Credential',
      },
    });
  }

  const UserInfo = UserFound[0];
  const Uid = UserFound[0].id;

  const UserObj = {};

  UserObj.isProfileComplete = parseInt(await ProfileService.getInfo(Uid, 'isProfileComplete'));
  UserObj.firstname = await ProfileService.getInfo(Uid, 'firstName');
  UserObj.lastName = await ProfileService.getInfo(Uid, 'lastName');
  UserObj.role = await ProfileService.getInfo(Uid, 'role');
  UserObj.gender = await ProfileService.getInfo(Uid, 'gender');
  UserObj.userId = UserInfo.id;
  UserObj.isConfirmed = UserInfo.isConfirmed;
  UserObj.telephone = parseInt(await ProfileService.getInfo(Uid, 'telephone'));
  UserObj.isBlocked = UserInfo.isBlocked;
  UserObj.email = UserInfo.email;
 

  UserObj.ProfilePics = await ProfileService.getInfo(Uid, 'profilePic');

  

  const token = jwt.sign({ UserId: UserObj.userId, role: UserObj.role, isProfileComplete: UserObj.isProfileComplete }, secret.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  UserObj.jwtoken = token;

  res.status(201).json(
    UserObj,

  );
};

module.exports = Login;
