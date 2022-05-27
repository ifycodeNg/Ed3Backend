const UserService = require('../Utility/UserService');

const createUser = async (req, res) => {
  const Checkuser = await UserService.checkUser(req.body.email);
  

  if (!Checkuser) {
    const createUser = UserService.create(req);
    return res.status(201).json({
      success: true,
    });
  }

  return res.status(200).json({
    success: false,
  });
};
module.exports = createUser;
