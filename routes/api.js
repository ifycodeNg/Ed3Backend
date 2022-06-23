const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const path = require('path');
const multer = require('multer');
const csv = require('csvtojson');
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
const AllDirectories = require('../controller/AllDirectoryController');
const AllFiles = require('../controller/AllFilesController');
const DirectoryWithFileID = require('../controller/DirectoryWithFileID');
const AllContacts = require('../controller/ListAllContactsController');

const checkFileName = (name) => {
  if (name === 'profilePic') {
    const cs = path.join(__dirname, '../public/uploads/images');
    return cs;
  }
  if (name === 'directoryFile') {
    console.log('Single file');
    const cs = path.join(__dirname, '../public/uploads/files');

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
  } else if (file.fieldname === 'directoryFile') {
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

router.get('/verify_email', EmailVerifyController);

router.get('/password/reset/:userId/user', PasswordResetController.PasswordResetController);

router.get('/profile/:id', isAuthenticated, ProfilePerUser);

router.get('/users', isAuthenticated, AllUserProfileController);

router.get('/elections', isAuthenticated, AllElections);

router.get('/election/:electionId', isAuthenticated, ViewElection);

router.get('/directories', isAuthenticated, AllDirectories);

router.get('/directory/:fileID', isAuthenticated, DirectoryWithFileID);

router.get('/files', isAuthenticated, AllFiles);

router.get('/contacts', isAuthenticated, AllContacts);

// POST REQUESTS

router.post('/login', LoginController);

router.post('/register', SignUpController);

router.post('/password/update', isAuthenticated, PasswordUpdateController);

router.post('/password/reset', PasswordResetController.PasswordGenLink);

router.post('/election', isAuthenticated, AddElectionController);

// uploadFile a file
const fileUpload = uploadFile.fields([
  { name: 'profilePic' },
  { name: 'directoryFile' },
]);
router.post(
  '/fileupload',
  [isAuthenticated, fileUpload],
  FileUploadController,
);

router.post('/profile', isAuthenticated, ProfileCreateController);

router.post('/create/user', isAuthenticated, CreateUserController);

// PUT REQUESTS
// update user
router.put('/election/:electionId', isAuthenticated, EditElection);

router.put('/user/:id', isAuthenticated, UpdateUserController);

module.exports = router;
