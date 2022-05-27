const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('../Utility/SignupService');
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

  const UserInfo = UserFound[0].dataValues;
  const Uid = UserFound[0].dataValues.id;

  const UserObj = {};
  const isProfileComplete = await ProfileService.getInfo(Uid, 'isProfileComplete');
  const firstname = await ProfileService.getInfo(Uid, 'firstName');
  const lastName = await ProfileService.getInfo(Uid, 'lastName');
  const role = await ProfileService.getInfo(Uid, 'role');
  const gender = await ProfileService.getInfo(Uid, 'gender');
  UserObj.userId = UserInfo.id;
  UserObj.isConfirmed = UserInfo.isConfirmed;
  UserObj.isBlocked = UserInfo.isBlocked;
  UserObj.email = UserInfo.email;
  UserObj.role = role;

  const ProfilePic = await ProfileService.getInfo(Uid, 'profilePic');

  UserObj.isProfileComplete = parseInt(isProfileComplete);

  UserObj.firstname = firstname;
  UserObj.lastName = lastName;
  UserObj.gender = gender;

  UserObj.ProfilePics = ProfilePic;

  const token = jwt.sign({ UserId: UserObj.userId, role: UserObj.role, isProfileComplete: UserObj.isProfileComplete }, secret.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  UserObj.token = token;

  res.status(201).json(
    UserObj,

  );
};

module.exports = Login;
