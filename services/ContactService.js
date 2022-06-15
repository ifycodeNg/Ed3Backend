const sequelize = require('../db/sequelize');

const AddContact = async (data) => {
  const nMeta = sequelize.Contact.create(data)
    .then((newCon) => {
      if (!newCon) {
        return false;
      }

      if (newCon) {
        return newCon;
      }
    // return newCon;
    })
    .catch((err) => {
      throw err;
    });

  const output = await nMeta;
  return output;

  // const output = await nMeta;
  // return output;
  //   console.log('hello2');
  //   const query = Model.Contact.create({
  //     directory_id: UserInfo.directoryId,
  //     mobileNumber: UserInfo.telephone,

  //   });

//   return query;
};

const getContactWithDirectoryID = async (did) => {
  const ContatsFound = sequelize.Contact.findOne({
    where: {
      directoryID: did,
    },

  });
  ContatsFound.then((contactResult) => {
    if (!contactResult) {
      return false;
    }

    if (contactResult) {
      return contactResult;
    }
    return contactResult;
  })
    .catch((err) => {
      throw err;
    });
  const output = await ContatsFound;
  return output;

};

// const AddContacts = async (UserInfo) => {
//   console.log("hello")
//         for (let i = 0; i < UserInfo['mobileNumbers'].length ; i++) {
//             const query = Model.Contact.create({
//                 directory_id: UserInfo['directoryId'],
//                 mobileNumber: UserInfo['mobileNumbers'][i]

//             });

// }
//     return true;
//   };

module.exports = { AddContact, getContactWithDirectoryID };
