const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('../db/sequelize');
const UserMetaService = require('../services/UserMetaService');
const secret = require('../config/secret');

const Login = async (req, res) => {
  const { email, password } = req.body;

  const isValidPassword = (userpass, mpassword) => bcrypt.compareSync(mpassword, userpass);

  const loginUser = await sequelize.User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user) {
        return false;
      }

      if (!isValidPassword(user.password, password)) {
        return false;
      }

      if (isValidPassword(user.password, password)) {
        const userinfo = user.get();

        return userinfo;
      }
    })
    .catch((err) => false);

  const waitOutput = loginUser;

  if (!waitOutput) {
    res.type('application/json');
    return res.status(200).json({ msg: 'Password Mismatch' });
  }

  if (waitOutput) {
    const uid = waitOutput.id;

    const metaKey = 'isProfileComplete';

    const metaOutput = await UserMetaService.getMeta(uid, metaKey);

    const isProfileComplete = Number(metaOutput);

    const firstName = await UserMetaService.getMeta(uid, 'firstName');
    const lastName = await UserMetaService.getMeta(uid, 'lastName');
    const profilePic = await UserMetaService.getMeta(uid, 'profilePic');

    const awaitingOutObj = {
      userID: uid,
      role: waitOutput.role,
      isProfileComplete: metaOutput,
    };

    const token = jwt.sign(awaitingOutObj, secret.ACCESS_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    const toReturn = {

      id: waitOutput.id,
      email: waitOutput.email,
      role: waitOutput.role,
      isConfirmed: waitOutput.isConfirmed,
      isBlocked: waitOutput.isBlocked,
      firstName,
      lastName,
      profilePic,
      isProfileComplete,
      jwtoken: token,
    };

    res.type('application/json');
    return res.status(201).json(toReturn);
  }
};

module.exports = Login;
