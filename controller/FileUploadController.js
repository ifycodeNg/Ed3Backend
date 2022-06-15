const csv = require('csvtojson');
const R = require('ramda');
const UserMetaService = require('../services/UserMetaService');
const DirectoryService = require('../services/DirectoryService');
const ContactService = require('../services/ContactService');

const FileUploadController = async (req, res) => {
  const { uid, eid, key, fileName } = req.body;
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
  if (key === 'directoryFile') {
    const multipleNumbers = (telephone) => {
      if (R.map(R.trim, R.split(',', telephone)).length >= 2) {
        return true;
      }

      return false;
    };
    if (eid) {
      const FilePath = postedFile.path;

      const contacts = await csv().fromFile(FilePath);

      console.log(`THE CONTEACTS ==> ${JSON.stringify(contacts)}`);

      // check if the template is empty before the loop

      const checkCons = R.isEmpty(contacts);

      console.log(`THE CHEC RESULT ==> ${JSON.stringify(checkCons)}`);

      if (!checkCons) {
        const upFilePath = await checkMediaPath(postedFile);

        const AddFilePath = await DirectoryService.AddFilePath(uid, fileName, upFilePath);

        for (let i = 0; i < contacts.length; i++) {
          const element = contacts[i];

          // console.log('this is IT ===> ' + JSON.stringify(element.firstName));

          if (element.firstName == undefined
            || element.lastName == undefined
            || element.role == undefined
            || element.rank == undefined
            || element.mobileNumber == undefined
            || element.deploymentLevel == undefined
            || element.deploymentLocation == undefined) {
            console.log('Wrong Template');

            res.type('application/json');
            return res.status(200).json({ msg: 'Wrong Template' });
          }

          // if (AddFilePath) {
          const conData = {
            eid,
            fileID: AddFilePath.id,
            firstName: element.firstName,
            lastName: element.lastName,
            otherNames: element.otherNames,
            role: element.role,
            rank: element.rank,
            deploymentLevel: element.deploymentLevel,
            deploymentLocation: element.deploymentLocation,
            createdBy: uid,
          };

          const enterDir = await DirectoryService.AddDirectory(conData);

          if (enterDir) {
            const contactData = {
              directoryID: enterDir.id,
              mobileNumber: element.mobileNumber,
            };
            await ContactService.AddContact(contactData);
          }

          // if (createDirectory) {
          //   res.type('application/json');
          //   return res.status(201).json({ msg: 'Successfull' });
          // } else {
          //   res.type('application/json');
          //   return res.status(200).json({ msg: 'Something went wrong' });
          // }
          // }

          // check if lop is finished

          if (contacts.length - 1 === i) {
            res.type('application/json');
            return res.status(201).json({ msg: 'Successfull' });
          }

          // console.log('correct templae');
          // return true;
        }
      } else {
        console.log('the template is empty ==> ');
        return false;
      }

      // const FilePath = postedFile.path;
      // const AddFilePath = await DirectoryService.AddFilePath(uid, FilePath);
      // (async () => {
      //   try {
      //     const contacts = await csv().fromFile(FilePath);
      //     const UserObj = {};
      //     const contactObj = {};
      //     const mobileNumber = [];
      //     for (let i = 0; i < contacts.length; i++) {
      //       console.log('the CONTACTS ==> ' + JSON.stringify(contacts[i]))

      //       UserObj.fName = contacts[i].fName;
      //       UserObj.lName = contacts[i].lName;
      //       UserObj.otherNames = contacts[i].otherNames;
      //       UserObj.role = contacts[i].role;
      //       UserObj.eid = eid;
      //       UserObj.rank = contacts[i].rank;
      //       const checkMobileNo = multipleNumbers(contacts[i].telephone);

      //       if (checkMobileNo) { // Check for multiple Numbers for one person
      //         const telephones = R.map(R.trim, R.split(',', contacts[i].telephone)); // Check for commas Return Array
      //         for (let i = 0; i < telephones.length; i++) {
      //           if (telephones[i].length > 11 || telephones[i].length < 11) { // Check if mobile number is below 11 or above 11
      //             res.type('application/json');
      //             return res.status(200).json({ msg: 'Phone Number Not Complete Please Verify' });
      //           }
      //           mobileNumber.push(telephones[i]);
      //         }
      //         contactObj.mobileNumbers = mobileNumber;
      //         const AddDirectory = await DirectoryService.AddDirectory(uid, UserObj);
      //         if (AddDirectory) {
      //           contactObj.directoryId = AddDirectory.id;
      //           const AddContacts = await ContactService.AddContacts(contactObj);
      //         } else {
      //           res.type('application/json');
      //           return res.status(504).json('An Error Occurred');
      //         }
      //       }
      //       if (!checkMobileNo) {
      //         const AddDirectory = await DirectoryService.AddDirectory(uid, UserObj);
      //         if (AddDirectory) {
      //           contactObj.telephone = contacts[i].telephone;
      //           contactObj.directoryId = AddDirectory.id;
      //           const AddContact = await ContactService.AddContact(contactObj);
      //         } else {
      //           res.type('application/json');
      //           return res.status(504).json('An Error Occurred');
      //         }
      //       }
      //     }
      //     res.type('application/json');
      //     return res.status(201).json({ success: true });
      //   } catch (err) {
      //     console.log(err);
      //     return res.status(200).json({ success: false });
      //   }
      // })();
    } else {
      res.type('application/json');
      return res.status(200).json('Election Id not Found');
    }
  }

  return true;
};

module.exports = FileUploadController;
