const bcrypt = require('bcrypt');
const sequelize = require('../db/sequelize');

const userService = require('../services/UserService');

const PasswordUpdateController = async (req, res, next) => {
  const { uid, currentPassword, newPassword } = req.body;

  const userPassword = await userService.getUserPassword(uid);

  const currentUserPassword = userPassword;

  const isValidPassword = async (userpass, password) => bcrypt.compareSync(password, userpass);

  const pCheck = await isValidPassword(currentUserPassword, currentPassword);

  const generateHash = async (pword) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pword, salt, null);
  };

  if (pCheck) {
    const newHashPassword = await generateHash(newPassword);

    sequelize.User.update(
      {
        password: newHashPassword,
      },
      {
        where: {
          id: uid,
        },
      }
    )
      .then((updatedPassword) => {
        if (!updatedPassword) {
          res.type('application/json');
          return res.status(200).json({
            status: 'error',
            body: 'Password not updated, please try again',
          });
        }

        if (updatedPassword) {
          res.type('application/json');
          return res
            .status(201)
            .json({ status: 'success', body: 'Password Updated Successfully' });
        }
      })
      .catch((err) => {
        next(err);
        req.flash('error', 'An error Occurred');
        res.redirect('/account');
      });
  } else if (!pCheck) {
    res.type('application/json');
    return res.status(200).json({
      status: 'error',
      body: 'Your current password doesnt match your exisiting password',
    });
  }
};

module.exports = PasswordUpdateController;
