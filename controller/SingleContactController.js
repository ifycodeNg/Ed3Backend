const ContactService = require('../services/ContactService');
const DirectoryService = require('../services/DirectoryService');

const SingleContactController = async (req, res) => {
  const conID = req.params.id;

  const getDir = await DirectoryService.getSingleDirectory(conID);

  if (getDir) {
    const getContact = await ContactService.getContactWithDirectoryID(getDir.id);

    // console.log('the conGET CON ==> ' + JSON.stringify(getContact));

    const newObj = { };

    newObj.id = getDir.id;
    newObj.firstName = getDir.firstName;
    newObj.lastName = getDir.lastName;
    newObj.otherNames = getDir.otherNames;
    newObj.role = getDir.role;
    newObj.rank = getDir.rank;
    newObj.deploymentLocation = getDir.deploymentLocation;
    newObj.deploymentLevel = getDir.deploymentLevel;

    newObj.mobileNumber = `0${getContact.mobileNumber}`;

    res.status(201).json(newObj);
  } else {
    res.status(200).json('Contact Not Found');
  }
};

module.exports = SingleContactController;
