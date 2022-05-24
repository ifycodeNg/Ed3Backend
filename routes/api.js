const express = require('express');
const jwt = require('jsonwebtoken');
const secret=require("../config/secret")
const router = express.Router();
const path = require('path');
const multer = require('multer')
// const authRoute = require('./authRoute');
let SignUpController=require("../controller/SignUpController")
let LoginController=require("../controller/LoginController")
let Email_verifyController=require("../controller/Email_verifyController")
let PasswordResetController=require("../controller/PasswordResetController")
let ProfileController=require("../controller/ProfileLookupController")
let ProfileUploadController=require("../controller/ProfileUploadController")
//let uploadController=require("../controller/UploadController")
let PasswordUpdateController=require("../controller/PasswordUpdateController")


const checkFileName = (name) => {
  if (name === 'contactDoc') {
    const cs = path.join(__dirname, '../public/uploads/');
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
  if (file.fieldname === 'contactDoc') {
    if (
      file.mimetype === 'text/csv'
     
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



const isAuthenticated = (req, res, next) => {
  const bearerHeader = req.cookies.token;

  if (typeof bearerHeader !== 'undefined') {
    // const bearer = bearerHeader.split(' ');

    // const bearerToken = bearer[1];

    // verify the token
    console.log(bearerHeader)
    jwt.verify(bearerHeader, secret.ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log(decoded)
      if (err) {
        res.sendStatus(403);
      }

      if (decoded) {
        req.cookies.token ;
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

router.get('/verify/:id/user', Email_verifyController);

router.post('/password/update', PasswordUpdateController);

router.post('/password/reset', PasswordResetController.PasswordGenLink); 

router.get('/password/reset/:userId/user', PasswordResetController.PasswordResetController); 

router.get('/profile', isAuthenticated,ProfileController);

router.post("/profile/upload",isAuthenticated,ProfileUploadController)

// router.get('/contacts', isAuthenticated,ProfileController);

//router.post('/contacts/upload',uploadFile.single("contactDoc"), isAuthenticated,uploadController);

module.exports = router;
