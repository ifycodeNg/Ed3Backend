const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../config/secret');
const sequelize = require('../db/sequelize');
// const UserService = require('../services/UserService');
const EmailService = require('../services/EmailService');
const UserMetaService = require('../services/UserMetaService');

const createUser = async (req, res, next) => {
  const { email, role } = req.body;

  const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*_+-=';

  const generateHash = function (pwrd) {
    return bcrypt.hashSync(pwrd, bcrypt.genSaltSync(8), null);
  };

  const passGen = async () => {
    const chars = alpha + numbers + symbols;

    let password = '';

    for (let i = 0; i < 7; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  };

  const confirmationToken = crypto.randomBytes(32).toString('hex');

  const pword = await passGen();

  const CheckForDuplicate = sequelize.User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        return false;
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
            return false;
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

  const awaitingOut = await CheckForDuplicate;

  if (!awaitingOut) {
    res.type('application/json');
    return res.status(200).json({ msg: 'Email Already Taken' });
  }

  if (awaitingOut) {
    const uID = awaitingOut.id;

    const profileKey = 'isProfileComplete';
    const profileValue = 0;
    const profileMeta = await UserMetaService.createMeta(
      uID,
      profileKey,
      profileValue,
    );

    awaitingOut.isProfileComplete = profileMeta;

    if (profileMeta) {
      const dLink = `${config.baseUrl}/api/verify_email?id=${uID}&token=${confirmationToken}`;

      const body = `
      
      <p>Welcome to INEC ED3, </p>
      <p>Your Password Is ${pword}</p>
      <p>Kindly click on the link below to verify your email and update your password</p>
      
      <a href="${dLink}" style="display:block;width:50%;text-align:center;padding:12px; background-color:#1A8C18;font-size:14px; color:#ffffff; border-radius:4px; text-decoration:none; text-transform:uppercase;">Verify Email Address</a>
      `;

      const sendVEmail = await EmailService.SendMail(email, 'Verification Of Email', body);

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
    return res.status(200).json('Something Went wrong');
  }
};
module.exports = createUser;
