const UserService = require('../Utility/SignupService');
const config = require('../config/secret');
const EmailService = require('../Utility/EmailService');

const SignUp = async (req, res) => {
  const UserFound = await UserService.checkUser(req.body.email);

  if (UserFound[0] == undefined) {
    const createUser = UserService.CreateUser(req);
    const { email } = req.body;
    const token = await createUser;

    const message = `<a 
    href="http://${config.baseUrl}/api/verify/${token.id}/user?token=${token.token}">
    Click Here Verify your Email Address
    </a>`;

    await EmailService.SendMail(email, 'Verification Of Email', message);
    res.status(201).json({
      msg: 'User Was Created Successfully Please Check Email For Verification',
    });
  } else if (UserFound[0].email) {
    return res.status(200).json({
      errors: {
        msg: 'This Email already exist',
      },
    });
  }
};
module.exports = SignUp;
