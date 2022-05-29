const bcrypt = require('bcrypt');

const User = require('../db/sequelize');

const Changepassword = async (email, password) => {
  const newPassword = bcrypt.hashSync(password, 10);

  const id = email;
  userFound = User.User.update(
    {
      password: newPassword,
    },
    {
      where: {
        email: id,
      },

    },
  );
};

module.exports = Changepassword;
