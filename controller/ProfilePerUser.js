const ProfileService = require('../Utility/ProfileService');
const User = require('../Utility/UserService');

const ProfilePerUserController = async (req, res) => {
  const userId = req.params.id;
  const UserFound = await User.checkUserById(userId);
  if (UserFound === false) {
    res.status(200).json({ message: 'User Not Found' });
  } else {
    const UserObj = {};
    const UserInfo = UserFound[0];
    UserObj.userId = UserFound[0].id;
    UserObj.isConfirmed = UserFound[0].isConfirmed;
    UserObj.isConfirmed = UserFound[0].isConfirmed;
    UserObj.isBlocked = UserFound[0].isBlocked;
    UserObj.email = UserFound[0].email;

    const Uid = UserFound[0].id;

    UserObj.isProfileComplete = parseInt(await ProfileService.getInfo(Uid, 'isProfileComplete'));
    UserObj.firstname = await ProfileService.getInfo(Uid, 'firstName');
    UserObj.lastName = await ProfileService.getInfo(Uid, 'lastName');
    UserObj.gender = await ProfileService.getInfo(Uid, 'gender');
    UserObj.ProfilePics = await ProfileService.getInfo(Uid, 'profilePic');
    UserObj.telephone = parseInt(await ProfileService.getInfo(Uid, 'telephone'));
    UserObj.userId = UserInfo.id;
    UserObj.isConfirmed = UserInfo.isConfirmed;
    UserObj.isBlocked = UserInfo.isBlocked;
    UserObj.email = UserInfo.email;

    res.status(201).json(UserObj);
  }
};

module.exports = ProfilePerUserController;
