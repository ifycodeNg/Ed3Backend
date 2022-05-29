const axios = require('axios');
const User = require('../db/sequelize');
const secret = require('../config/secret');

const { API_KEY } = secret;
const URL = secret.MAIL_URL;
const { sender } = secret;
// send Mail
const SendMail = async (email, subject, message) => {
  const data = {
    sender,
    receiver: email,
    subject,
    body: message,
  };
  const headers = {
    headers: {
      apikey: `${API_KEY}`,
      'Content-Type': 'application/json',

    },
  };
  try {
    const apiRequest = await axios.post(`${URL}`, data, headers).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (token) => {
  userFound = User.User.findAll({
    where: {
      confirmationToken: token,
    },
  });
  return userFound;
};

// Update column for isConfirmed
const confirmEmail = async (Id) => {
  const id = Id;
  userFound = User.User.update(
    {
      isConfirmed: 1,
    },
    {
      where: {
        id,
      },

    },
  );
};

module.exports = {
  confirmEmail,
  SendMail,
  checkToken,
};
