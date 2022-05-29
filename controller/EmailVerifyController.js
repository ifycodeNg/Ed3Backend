const EmailVerifyService = require('../services/EmailService');
const UserService = require('../services/UserService');

const EmailVerify = async (req, res) => {
  const { id, token } = req.query;

  const tokenFound = await EmailVerifyService.checkToken(token);
  if (!tokenFound) {
    res.status(200).json({ msg: 'Invalid link' });
  } else if (tokenFound) {
    // update user
    const isConfirmed = await UserService.updateUser(id, 'isConfirmed', 1);
    if (isConfirmed) {
      res.redirect('https://ed3.apptestenv.com/authentication/login');
    } else {
      res.status(200).json({ msg: 'Verification Failed' });
    }
  }
};
module.exports = EmailVerify;
