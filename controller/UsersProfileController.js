const UserService = require('../services/UserService');
const UserMetaService = require('../services/UserMetaService');

const AllUserProfile = async (req, res) => {
  const UserFound = await UserService.getAllUsers();
  if (!UserFound) {
    res.status(200).json({ message: 'User Not Found' });
  } else {
    const Users = [];

    for (let i = 0; i < UserFound.length; i++) {
      const UserObj = {};
      const EachUser = UserFound[i];

      const UID = EachUser.id;
      UserObj.userID = UID;

      UserObj.isConfirmed = Number(EachUser.isConfirmed);
      UserObj.isBlocked = Number(EachUser.isBlocked);
      UserObj.email = EachUser.email;
      UserObj.role = EachUser.role;

      UserObj.firstName = await UserMetaService.getMeta(UID, 'firstName');

      UserObj.lastName = await UserMetaService.getMeta(UID, 'lastName');
      UserObj.gender = await UserMetaService.getMeta(UID, 'gender');
      UserObj.isProfileComplete = Number(await UserMetaService.getMeta(UID, 'isProfileComplete'));
      UserObj.profilePic = await UserMetaService.getMeta(UID, 'profilePic');
      UserObj.telephone = Number(await UserMetaService.getMeta(UID, 'telephone'));

      Users.push(UserObj);
    }

    res.status(201).json(Users);
  }

  return null;

  // res.status(200).json({ message: 'Something Went Wrong' });
};

module.exports = AllUserProfile;
