const crypto = require('crypto');
const Changepassword = require('../services/PasswordService');
const UserService = require('../services/UserService');
const config = require('../config/secret');
const EmailService = require('../services/EmailService');
const TokenService = require('../services/TokenService');

let token;

const PasswordGenLink = async (req, res) => {
  const { email } = req.body;
  const UserFound = await UserService.checkUser(req.body.email);
  token = crypto.randomBytes(32).toString('hex');

  console.log(UserFound);

  if (UserFound) {
    const userId = UserFound.id;
    const message = `<a 
    href="http://${config.baseUrl}/api/password/reset/${userId}/user?token=${token}">
    Click here to change your password
    </a>`;

    const Value = 'Password Reset Token';

    const sndEmail = await EmailService.SendMail(email, 'Password Reset Link', message);

    if (sndEmail) {
      const svToken = await TokenService.SaveToken(token, UserFound.id, Value);
      if (svToken) {
        res.type('application/json');
        return res.status(201).json({
          status: 'ok',
          body: 'Please Check Mail for Password Reset Link',
        });
      }
      res.type('application/json');
      return res.status(200).json({
        status: 'error',
        body: 'We could not save the token',
      });
    }
    res.type('application/json');
    return res.status(200).json({
      status: 'error',
      body: 'We could not send the email',
    });
  }
  res.type('application/json');
  return res.status(200).json({
    status: 'error',
    body: 'Email Address doesnt Exist',
  });

  //   await TokenService.SaveToken(token, UserFound.id, Value);

  //   await EmailService.SendMail(email, 'Password Reset Link', message);

  //   res.json({
  //     msg: 'Please Check Mail for Password Reset Link',
  //   });
  // } else if (!UserFound) {
  //   res.json({
  //     msg: 'Email Address doesnt Exist',
  //   });
  // }
};

const PasswordResetController = async (req, res) => {
  const { userId } = req.params;

  const tk = req.query.token;

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
