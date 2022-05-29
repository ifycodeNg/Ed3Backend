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

    UserObj.isProfileComplete = Number(UserMetaService.getMeta(Uid, 'isProfileComplete'));
    UserObj.firstname = await UserMetaService.getMeta(Uid, 'firstName');
    UserObj.lastName = await UserMetaService.getMeta(Uid, 'lastName');
    UserObj.gender = await UserMetaService.getMeta(Uid, 'gender');
    UserObj.ProfilePics = await UserMetaService.getMeta(Uid, 'profilePic');
    UserObj.telephone = Number(await UserMetaService.getMeta(Uid, 'telephone'));
    UserObj.userId = UserInfo.id;
    UserObj.isConfirmed = UserInfo.isConfirmed;
    UserObj.isBlocked = UserInfo.isBlocked;
    UserObj.email = UserInfo.email;

    res.status(201).json(UserObj);
  }
};

module.exports = ProfilePerUserController;
