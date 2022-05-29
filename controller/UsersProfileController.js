const ProfileService = require('../Utility/ProfileService');
const User = require('../Utility/UserService');

const AllUserProfile = async (req, res) => {
  const UserFound = await User.getAllUsers();
  if (UserFound === false) {
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

      UserObj.firstName = await ProfileService.getInfo(UID, 'firstName');

      UserObj.lastName = await ProfileService.getInfo(UID, 'lastName');
      UserObj.gender = await ProfileService.getInfo(UID, 'gender');
      UserObj.isProfileComplete = parseInt(await ProfileService.getInfo(UID, 'isProfileComplete'));
      UserObj.profilePic = await ProfileService.getInfo(UID, 'profilePic');
      UserObj.role = await ProfileService.getInfo(UID, 'role');
      UserObj.telephone = parseInt(await ProfileService.getInfo(UID, 'telephone'));

      Users.push(UserObj);
    }

    res.status(201).json(Users);
  }
};

module.exports = AllUserProfile;
