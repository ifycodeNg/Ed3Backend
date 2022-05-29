const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sequelize = require('../db/sequelize');
const config = require('../config/secret');
const EmailService = require('../services/EmailService');
const UserMetaService = require('../services/UserMetaService');

const SignUp = async (req, res, next) => {
  const { email } = req.body;
  const pword = req.body.password;
  const role = 'user';

  const generateHash = function (pwrd) {
    return bcrypt.hashSync(pwrd, bcrypt.genSaltSync(8), null);
  };

  const confirmationToken = crypto.randomBytes(32).toString('hex');

  const dataEntry = sequelize.User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        res.type('application/json');
        return res.status(200).json({ msg: 'Email Already Taken' });
      }

      const userPassword = generateHash(pword);

      const data = {
        email,
        password: userPassword,
        confirmationToken,
        role,
        isConfirmed: 0,
        isBlocked: 0,
      };

      const createU = sequelize.User.create(data)
        .then((newUser) => {
          if (!newUser) {
            res.type('application/json');
            return res.status(200).json({ msg: 'Error Creating User' });
          }

          if (newUser) {
            return newUser;
          }
        })
        .catch((err) => {
          next(err);
        });

      return createU;
    })
    .catch((err) => {
      next(err);
    });

  const awaitingOut = await dataEntry;

  const uID = awaitingOut.id;

  const profileKey = 'isProfileComplete';
  const profileValue = 0;
  const profileMeta = await UserMetaService.createMeta(
    uID,
    profileKey,
    profileValue
  );

  if (profileMeta) {
    const message = `Click on this <a href="${config.baseUrl}/api/verify_email?id=${uID}&token=${confirmationToken}">Link</a> to verify your email`;

    const sendVEmail = await EmailService.SendMail(email, 'Verification Of Email', message);

    if (sendVEmail.status === 201) {
      res.type('application/json');
      return res.status(201).json('Account Created Successfully');
    }

    if (!sendVEmail) {
      res.type('application/json');
      return res.status(504).json('An Error Occurred');
    }
  }

  res.type('application/json');
  return res.status(200).json('Something Went Wrong');
};
module.exports = SignUp;
