/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const ProfileCreation = require('../Utility/ProfileService');
const UserAccount = require('../Utility/SignupService');
const secret = require('../config/secret');

const ProfileUploadController = async (req, res) => {
  if (!req.file) {
    // eslint-disable-next-line prefer-destructuring
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error('You need to login.');
  
    const token = authorization.split(' ')[1];
  
    const { userId } = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
    const UserLookUp = await UserAccount.checkUserById(userId);
    if (UserLookUp == false) {
      // eslint-disable-next-line key-spacing
      res.json({ message: 'User Not Found' });
    } else if (UserLookUp[0].dataValues.isConfirmed === 0) {
      res.json({ message: 'Email Not Verified' });
    } else {
      const CreateProfile = await ProfileCreation.ProfileCreate(req, UserLookUp[0].dataValues.id);
      const ProfileDetail = await ProfileCreation.ProfileLookup(UserLookUp[0].dataValues.id);
      const UpdateProfile = await ProfileCreation.UpdateProfile(ProfileDetail[0].id);
      res.json({ message: 'Profile Created Successfully' });
    }
  } 
};
module.exports = ProfileUploadController;
