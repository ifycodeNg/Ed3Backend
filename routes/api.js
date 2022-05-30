const express = require('express');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const router = express.Router();
const path = require('path');
const multer = require('multer');

const SignUpController = require('../controller/SignUpController');
const LoginController = require('../controller/LoginController');
const EmailVerifyController = require('../controller/EmailVerifyController');
const PasswordResetController = require('../controller/PasswordResetController');
const ProfilePerUser = require('../controller/ProfilePerUser');
const ProfileUploadController = require('../controller/ProfileCreateController');
const PasswordUpdateController = require('../controller/PasswordUpdateController');
const AllUserProfileController = require('../controller/UsersProfileController');
const uploadFileController = require('../controller/FileUploadController');
const CreateUserController=require('../controller/CreateUserController')


const checkFileName = (name) => {
  if (name === 'contactDoc') {
    const cs = path.join(__dirname, '../uploads/');
    return cs;
  }
  if (name === 'profilePic') {
    console.log('Single file');
    const cs = path.join(__dirname, '../uploads/');
    return cs;
  }
  if (name === 'contactFile') {
    const cs = path.join(__dirname, '../public/uploads/contacts');

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
  console.log('Single file');
  if (file.fieldname === 'contactDoc') {
    if (
      file.mimetype === 'text/csv'

    ) {
      cb(null, true);
    } else {
      req.fileValidationError = 'Forbidden Extension';
      return cb(null, false, req.fileValidationError);
    }
  } else if (file.fieldname === 'profilePic') {
    console.log('Single file');
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      console.log('Single file');
      cb(null, true);
    }
  } else {
    req.fileValidationError = 'Forbidden Extension';
    return cb(null, false, req.fileValidationError);
  }

  if (file.fieldname === 'contactFile') {
    if (file.mimetype === 'text/csv' || file.mimetype === 'text/xls') {
      cb(null, true);
    } else {
      req.fileValidationError = 'Forbidden Extension';
      return cb(null, false, req.fileValidationError);
    }
  }

  req.fileValidationError = 'Forbidden Extension';
  return cb(null, false, req.fileValidationError);
};

const uploadFile = multer({
  storage,
  fileFilter: singleFileFilter,
});

const isAuthenticated = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    jwt.verify(bearerToken, secret.ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log(decoded);
      if (err) {
        res.sendStatus(403);
      }

      if (decoded) {
        req.cookies.token;
        next();
      }
    });
  } else {
    // forbidden
    // console.log('there was a problem with the req');
    res.sendStatus(403);
  }
};

router.post('/login', LoginController);

router.post('/register', SignUpController);

router.get('/verify/:id/user', EmailVerifyController);

router.post('/password/update', isAuthenticated, PasswordUpdateController);

router.post('/password/reset', PasswordResetController.PasswordGenLink);

router.get('/password/reset/:userId/user', PasswordResetController.PasswordResetController);

router.get('/profile/:id', isAuthenticated, ProfilePerUser);

router.get('/profile', isAuthenticated, AllUserProfileController);

router.post('/fileupload', isAuthenticated, uploadFile.single('profilePic'), uploadFileController);

router.post('/profile', isAuthenticated, ProfileUploadController);

router.post('/create/user', isAuthenticated, CreateUserController);

module.exports = router;
