const jwt = require('jsonwebtoken');
const ProfileCreation = require('../Utility/ProfileService');
const UserAccount = require('../Utility/SignupService');
const secret = require('../config/secret');

const ProfileUploadController = async (req, res) => {
  if (!req.file) {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('You need to login.');

    const token = authorization.split(' ')[1];

    const { userId } = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    const UserLookUp = await UserAccount.checkUserById(userId);
    if (UserLookUp == false) {
      // eslint-disable-next-line key-spacing
      res.status(200).json({ message: 'User Not Found' });
    } else if (UserLookUp[0].dataValues.isConfirmed === 0) {
      res.status(200).json({ message: 'Email Not Verified' });
    } else {
      const CreateProfile = await ProfileCreation.ProfileCreate(req, UserLookUp[0].id);
      const ProfileDetail = await ProfileCreation.ProfileLookup(UserLookUp[0].id);
      const UpdateProfile = await ProfileCreation.UpdateProfile(ProfileDetail[0].id);
      res.status(201).json({ message: 'Profile Created Successfully' });
    }
  }
};
module.exports = ProfileUploadController;
