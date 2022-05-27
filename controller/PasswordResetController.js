const crypto = require('crypto');
const Changepassword = require('../Utility/PasswordService');
const UserService = require('../Utility/SignupService');
const config = require('../config/secret');
const EmailService = require('../Utility/EmailService');
const TokenService = require('../Utility/TokenService');

let token;

const PasswordGenLink = async (req, res) => {
  const { email } = req.body;
  const UserFound = await UserService.checkUser(req.body.email);
  token = crypto.randomBytes(32).toString('hex');

  console.log(UserFound);

  if (UserFound) {
    const userId = UserFound[0].dataValues.id;
    const message = `<a 
    href="http://${config.baseUrl}/api/password/reset/${userId}/user?token=${token}">
    Click here to change your password
    </a>`;

    const Value = 'Password Reset Token';

    await TokenService.SaveToken(token, UserFound[0].dataValues.id, Value);

    await EmailService.SendMail(email, 'Password Reset Link', message);

    res.json({
      msg: 'Please Check Mail for Password Reset Link',
    });
  } else if (!UserFound) {
    res.json({
      msg: 'Email Address doesnt Exist',
    });
  }
};

const PasswordResetController = async (req, res) => {
  const { userId } = req.params;

  tk = req.query.token;

  const findUserByToken = TokenService.findUserByToken(userId, tk);

  const UserFound = await UserService.checkUserById(userId);

  if (!findUserByToken) {
    return res.status(400).send('Invalid link or expired');
  }

  const passwordChange = await Changepassword(UserFound[0].dataValues.email, req.body.new_password);

  if (passwordChange == undefined) {
    res.json({
      msg: 'Password Reset Successfully ',
    });
  } else {
    res.status(400).json({
      msg: 'Error Occured Please Try Again ',
    });
  }
};

module.exports = {
  PasswordResetController,
  PasswordGenLink,

};
