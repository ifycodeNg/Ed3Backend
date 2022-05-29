const UserMetaService = require('../services/UserMetaService');

const ProfileCreateController = async (req, res) => {
  const profileObj = req.body;

  const { uid } = profileObj;

  const reqEntries = Object.entries(profileObj);

  for (const [key, value] of reqEntries) {
    if (key !== 'uid' && key !== 'profilePic') {
      if (key === 'isProfileComplete') {
        const upd = await UserMetaService.updateMeta(uid, key, value);
        if (upd === false) {
          res.json('error');
          break;
        }
      } else if (value !== '') {
        const upd = await UserMetaService.createMeta(uid, key, value);
        if (upd === false) {
          res.json('error');
          break;
        }
      }
    }
  }

  res.type('application/json');
  return res.status(201).json({ message: 'Profile Created Successfully' });
};
module.exports = ProfileCreateController;
