const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

const router = express.Router();

// const authRoute = require('./authRoute');

const config = require('../config/secret');

const isAuthenticated = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    // verify the token

    jwt.verify(bearerToken, config.jwtKey, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      }

      if (decoded) {
        req.token = bearerToken;
        next();
      }
    });
  } else {
    // forbidden
    // console.log('there was a problem with the req');
    res.sendStatus(403);
  }
};



const checkFileName = (name) => {
  if (name === 'profileImage') {
    const cs = path.join(__dirname, '../public/uploads/images');

    // return 'public/uploads/images';
    return cs;
  }

  return name;
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, checkFileName(file.fieldname));
  },
  filename: async (req, file, cb) => {
    const dName = file.fieldname;
    const ogName = file.originalname;
    const fName = `${dName}-${Date.now()}${path.extname(ogName)}`;
    cb(null, fName);
  },
  onError(err, next) {
    next(err);
  },
});

const singleFileFilter = async (req, file, cb) => {
  if (file.fieldname === 'profileImage') {
    if (
      file.mimetype === 'image/jpg'
      || file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      req.fileValidationError = 'Forbidden Extension';
      return cb(null, false, req.fileValidationError);
    }
  } else {
    req.fileValidationError = 'Forbidden Extension';
    return cb(null, false, req.fileValidationError);
  }
};

const uploadFile = multer({
  storage,
  fileFilter: singleFileFilter,
});

// router.post('/login', authRoute.loginPOST);

// router.post('/register', authRoute.registerPOST);

module.exports = router;
