const EmailVerifyService = require('../Utility/EmailService');

const EmailVerify = async (req, res) => {
  const tokenFound = await EmailVerifyService.checkToken(req.query.token);
  if (!tokenFound) {
    res.status(200).json({ msg: 'Invalid link' });
  } else if (tokenFound) {
    const isConfirmed = await EmailVerifyService.confirmEmail(req.params.id);

    res.redirect('https://ed3.apptestenv.com/authentication/login');
  }
};
module.exports = EmailVerify;
