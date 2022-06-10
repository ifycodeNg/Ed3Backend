const Model = require('../db/sequelize');

const AddDirectory = async (userId, UserInfo) => {
  const query = Model.Directory.create({
    userID: userId,
    fName: UserInfo.fName,
    lName: UserInfo.lName,
    rank: UserInfo.rank,
    role: UserInfo.role,
    eid : UserInfo.eid,
    otherName: UserInfo.otherName,
    electionId: UserInfo.eid,

  });
  return query;
};


const AddFilePath = async (userId, path) => {
  const AddPath = Model.File.create({
    userID: userId,
    path: path

  });

  return AddPath;
};
module.exports = {AddDirectory , AddFilePath };
