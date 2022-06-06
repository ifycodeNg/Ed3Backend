const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const path = require('path');
const multer = require('multer');
const secret = require('../config/secret');

const SignUpController = require('../controller/SignUpController');
const LoginController = require('../controller/LoginController');
const EmailVerifyController = require('../controller/EmailVerifyController');
const PasswordResetController = require('../controller/PasswordResetController');
const ProfilePerUser = require('../controller/ProfilePerUser');
const ProfileCreateController = require('../controller/ProfileCreateController');
const PasswordUpdateController = require('../controller/PasswordUpdateController');
const AllUserProfileController = require('../controller/UsersProfileController');
const FileUploadController = require('../controller/FileUploadController');
const CreateUserController = require('../controller/CreateUserController');
const UpdateUserController = require('../controller/UpdateUserController');
const AddElectionController = require('../controller/ElectionAddController');
const AllElections = require('../controller/ListAllElectionController');
const EditElection = require('../controller/EditElectionController');
const ViewElection = require('../controller/ViewElectionController');


const checkFileName = (name) => {
  // if (name === 'contactDoc') {
  //   const cs = path.join(__dirname, '../uploads/');
  //   return cs;
  // }
  if (name === 'profilePic') {
    console.log('Single file');
    const cs = path.join(__dirname, '../public/uploads/images');
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
  if (file.fieldname === 'profilePic') {
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
  } else if (file.fieldname === 'contactsFile') {
    if (file.mimetype === 'text/csv') {
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
        req.token = bearerToken;
        // req.cookies.token;
        next();
      }
    });
  } else {
    // forbidden
    // console.log('there was a problem with the req');
    res.sendStatus(403);
  }
};

// router.get('/verify/:id/user', EmailVerifyController);

router.get('/verify_email', EmailVerifyController);

router.get('/password/reset/:userId/user', PasswordResetController.PasswordResetController);

router.get('/profile/:id', isAuthenticated, ProfilePerUser);

router.get('/profile', isAuthenticated, AllUserProfileController);

router.get('/election', isAuthenticated, AllElections);

router.get('/election/:ElectionId', isAuthenticated, ViewElection);

// POST REQUESTS

router.post('/login', LoginController);

router.post('/register', SignUpController);

router.post('/password/update', isAuthenticated, PasswordUpdateController);

router.post('/password/reset', PasswordResetController.PasswordGenLink);

router.post('/election', isAuthenticated, AddElectionController);

// uploadFile a file
const fileUpload = uploadFile.fields([
  { name: 'profilePic' },
  { name: 'contactList'},
]);
router.post(
  '/fileupload',
  [isAuthenticated, fileUpload],
  FileUploadController,
);

// uploadFile a file
// const profilePicUpload = uploadFile.single('profilePic');
// router.post(
//   '/profile_picture_upload',
//   [isAuthenticated, profilePicUpload],
//   FileUploadController.ProfileImageUpload,
// );

// const fileUpload = uploadFile.fields([{ name: 'profileImage' }]);
// router.post('/fileupload/:name', profileImageUpload, fileRoute.filePOST);

router.post('/profile', isAuthenticated, ProfileCreateController);

router.post('/create/user', isAuthenticated, CreateUserController);


// PUT REQUESTS
// update user
router.put('/election/:ElectionId', isAuthenticated, EditElection);

router.put('/user/:id', isAuthenticated, UpdateUserController);

module.exports = router;
