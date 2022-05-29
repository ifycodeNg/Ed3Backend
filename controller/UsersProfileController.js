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
      UserObj.UserId = UID;

      UserObj.isConfirmed = EachUser.isConfirmed;
      UserObj.isBlocked = EachUser.isBlocked;
      UserObj.email = EachUser.email;

      UserObj.firstName = await UserMetaService.getMeta(UID, 'firstName');

      UserObj.lastName = await UserMetaService.getMeta(UID, 'lastName');
      UserObj.gender = await UserMetaService.getMeta(UID, 'gender');
      UserObj.isProfileComplete = Number(await UserMetaService.getMeta(UID, 'isProfileComplete'));
      UserObj.profilePic = await UserMetaService.getMeta(UID, 'profilePic');
      UserObj.role = await UserMetaService.getMeta(UID, 'role');
      UserObj.telephone = Number(await UserMetaService.getMeta(UID, 'telephone'));

      Users.push(UserObj);
    }

    res.status(201).json(Users);
  }

  res.status(200).json({ message: 'Something Went Wrong' });
};

module.exports = AllUserProfile;
