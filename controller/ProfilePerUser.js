const ProfileService = require('../Utility/ProfileService');
const User = require('../Utility/SignupService');

const ProfilePerUserController = async (req, res) => {
  const userId = req.params.id;
  const UserFound = await User.checkUserById(userId);
  if (UserFound === false) {
    res.status(200).json({ message: 'User Not Found' });
  } else {
    const UserObj = {};
    const UserInfo = UserFound[0].dataValues;
    UserObj.userId = UserFound[0].dataValues.id;
    UserObj.isConfirmed = UserFound[0].dataValues.isConfirmed;
    UserObj.isConfirmed = UserFound[0].dataValues.isConfirmed;
    UserObj.isBlocked = UserFound[0].dataValues.isBlocked;
    UserObj.email = UserFound[0].dataValues.email;

    const Uid = UserFound[0].dataValues.id;

    const isProfileComplete = await ProfileService.getInfo(Uid, 'isProfileComplete');
    const firstname = await ProfileService.getInfo(Uid, 'firstName');
    const lastName = await ProfileService.getInfo(Uid, 'lastName');
    const gender = await ProfileService.getInfo(Uid, 'gender');
    const ProfilePics = await ProfileService.getInfo(Uid, 'ProfilePic');
    UserObj.userId = UserInfo.id;
    UserObj.isConfirmed = UserInfo.isConfirmed;
    UserObj.isBlocked = UserInfo.isBlocked;
    UserObj.email = UserInfo.email;

    UserObj.firstname = firstname;
    UserObj.lastName = lastName;
    UserObj.gender = gender;
    UserObj.isProfileComplete = parseInt(isProfileComplete);
    UserObj.ProfilePics = ProfilePics;

    res.status(201).json(UserObj);
  }
};

module.exports = ProfilePerUserController;
