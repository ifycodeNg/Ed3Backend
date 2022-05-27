const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const UploadFile = require('../Utility/UploadService');

const FileUpload = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error('You need to login.');

  const token = authorization.split(' ')[1];
  console.log(req.file);
  const filePath = req.file.path;

  const { UserId } = jwt.verify(token, secret.ACCESS_TOKEN_SECRET);
  const uploadFile = UploadFile(UserId, filePath);

  return res.status(201).json({
    success: true,
  });
};

module.exports = FileUpload;
