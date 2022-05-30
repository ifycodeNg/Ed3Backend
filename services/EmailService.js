// const axios = require('axios');
const sequelize = require('../db/sequelize');
const secret = require('../config/secret');
const AxiosService = require('./AxiosService');

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
  const options = {
    headers: {
      apikey: `${API_KEY}`,
      'Content-Type': 'application/json',

    },
  };

  const SendEm = await AxiosService.postRequest(URL, data, options);

  return SendEm;
};

const checkToken = async (token) => {
  const userFound = sequelize.User.findOne({
    where: {
      confirmationToken: token,
    },
  }).then((user) => {
    if (!user) {
      return false;
    }
    return user;
  }).catch((err) => {
    throw err;
  });
  return userFound;
};

// Update column for isConfirmed
// const confirmEmail = async (Id) => {
//   const id = Id;
//   userFound = sequelize.User.update(
//     {
//       isConfirmed: 1,
//     },
//     {
//       where: {
//         id,
//       },

//     },
//   );
// };

// const sendVerificationEmail = async (uid) => {
//   const userDetails = await userUtility.getUser(uid);
//   const userEmail = userDetails.email;
//   const subject = 'Verification Email';

//   const token = Crypto.randomBytes(21).toString('hex').slice(0, 21);

//   if (token) {
//     const key = 'confirmationToken';

//     const createToken = await userUtility.updateUser(uid, key, token);

//     if (createToken) {
//       const body = `Click on this <a href="${hostUrl}/api/verification_email?id=${uid}&token=${token}">Link</a> to verify your email`;

//       const msg = {
//         to: userEmail,
//         from: hostEmail,
//         subject,
//         html: body,
//       };

//       const sendMail = sgMail.send(msg).then(
//         (resp) => true,
//         (error) => {
//           if (error) {
//             return false;
//           }
//         },
//       );

//       const outPutSend = await sendMail;
//       return outPutSend;
//     }
//   }
// };

module.exports = {
  // confirmEmail,
  SendMail,
  checkToken,
  // sendVerificationEmail,
};
