const csv = require('csvtojson');
const R = require('ramda');
const UserMetaService = require('../services/UserMetaService');
const DirectoryService = require('../services/DirectoryService');
const ContactService = require('../services/ContactService');

const FileUploadController = async (req, res) => {
  const { uid, eid, key } = req.body;
  const postedFile = req.files[key][0];

  if (req.fileValidationError) {
    res.type('application/json');
    return res
      .status(500)
      .json(`Invalid Image Format, Please Upload ${key === 'profilePic' ? 'JPG or JPEG' : 'CSV'} File(s) Only`);
  }

  const checkMediaPath = async (path) => {
    if (path !== undefined) {
      const pathToSlice = path.path;

      const fileUrl = pathToSlice.slice(37);

      return fileUrl;
    }
    return null;
  };

  const uploadedFilePath = await checkMediaPath(postedFile);

  if (key === 'profilePic') {
    const updateUsermeta = await UserMetaService.createMeta(uid, key, uploadedFilePath);
    if (updateUsermeta) {
      res.type('application/json');
      return res.status(201).json(updateUsermeta);
    }
  }
  if (key === 'contactList') {
    const multipleNumbers = (telephone) => {
      if (R.map(R.trim, R.split(',', telephone)).length >= 2) {
        return true;
      }

      return false;
    };
    if (eid) {
      const FilePath = postedFile.path;
      const AddFilePath = await DirectoryService.AddFilePath(uid, FilePath);
      (async () => {
        try {
          const contact = await csv().fromFile(FilePath);
          const UserObj = {};
          const contactObj = {};
          const mobileNumber = [];
          for (let i = 0; i < contact.length; i++) {
            UserObj.fName = contact[i].fName;
            UserObj.lName = contact[i].lName;
            UserObj.otherNames = contact[i].otherNames;
            UserObj.role = contact[i].role;
            UserObj.eid = eid;
            UserObj.rank = contact[i].rank;
            const checkMobileNo = multipleNumbers(contact[i].telephone);

            if (checkMobileNo) { // Check for multiple Numbers for one person
              const telephones = R.map(R.trim, R.split(',', contact[i].telephone)); // Check for commas Return Array
              for (let i = 0; i < telephones.length; i++) {
                if (telephones[i].length > 11 || telephones[i].length < 11) { // Check if mobile number is below 11 or above 11
                  res.type('application/json');
                  return res.status(200).json({ msg: 'Phone Number Not Complete Please Verify' });
                }
                mobileNumber.push(telephones[i]);
              }
              contactObj.mobileNumbers = mobileNumber;
              const AddDirectory = await DirectoryService.AddDirectory(uid, UserObj);
              if (AddDirectory) {
                contactObj.directoryId = AddDirectory.id;
                const AddContacts = await ContactService.AddContacts(contactObj);
              } else {
                res.type('application/json');
                return res.status(504).json('An Error Occurred');
              }
            }
            if (!checkMobileNo) {
              const AddDirectory = await DirectoryService.AddDirectory(uid, UserObj);
              if (AddDirectory) {
                contactObj.telephone = contact[i].telephone;
                contactObj.directoryId = AddDirectory.id;
                const AddContact = await ContactService.AddContact(contactObj);
              } else {
                res.type('application/json');
                return res.status(504).json('An Error Occurred');
              }
            }
          }
          res.type('application/json');
          return res.status(201).json({ success: true });
        } catch (err) {
          console.log(err);
          return res.status(200).json({ success: false });
        }
      })();
    } else {
      res.type('application/json');
      return res.status(200).json('Election Id not Found');
    }
  }

  return true;
};

module.exports = FileUploadController;
