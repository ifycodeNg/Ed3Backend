const UserMetaService = require('../services/UserMetaService');
const User = require('../services/UserService');

const ProfilePerUserController = async (req, res) => {
  const userId = req.params.id;
  const UserFound = await User.checkUserById(userId);
  if (UserFound === false) {
    res.status(200).json({ message: 'User Not Found' });
  } else {
    const UserObj = {};
    const UserInfo = UserFound;

    const Uid = UserInfo.id;

    UserObj.isProfileComplete = Number(await UserMetaService.getMeta(Uid, 'isProfileComplete'));
    UserObj.firstName = await UserMetaService.getMeta(Uid, 'firstName');
    UserObj.lastName = await UserMetaService.getMeta(Uid, 'lastName');
    UserObj.gender = await UserMetaService.getMeta(Uid, 'gender');
    UserObj.profilePic = await UserMetaService.getMeta(Uid, 'profilePic');
    UserObj.mobileNumber = Number(await UserMetaService.getMeta(Uid, 'mobileNumber'));
    UserObj.userID = UserInfo.id;
    UserObj.isConfirmed = UserInfo.isConfirmed;
    UserObj.isBlocked = UserInfo.isBlocked;
    UserObj.email = UserInfo.email;

    res.status(201).json(UserObj);
  }
};

module.exports = ProfilePerUserController;
