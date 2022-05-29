const jwt = require('jsonwebtoken');
const Changepassword = require('../Utility/PasswordService');

const PasswordResetController = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error('You need to login.');

  const token = authorization.split(' ')[1];

  const { UserId } = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
  const { password } = req.body;
  const passwordChange = await Changepassword(UserId, password);

  if (passwordChange == undefined) {
    res.json({
      msg: 'Password Updated Successfully ',
    });
  } else {
    res.status(400).json({
      msg: 'Error Occured Please Try Again ',
    });
  }
};

module.exports = PasswordResetController;
