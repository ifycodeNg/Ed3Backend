const DirectoryService = require('../services/DirectoryService');
const ContactService = require('../services/ContactService');

const DirectoryWithFileID = async (req, res) => {
  const { fileID } = req.params;

  const getDirs = await DirectoryService.GetAllDirectoryWithFileID(fileID);

  if (getDirs) {
    const dirArr = [];

    for (let i = 0; i < getDirs.length; i++) {
      const element = getDirs[i];

      const getContact = await ContactService.getContactWithDirectoryID(element.id);

      // console.log(`the element ==> ${JSON.stringify(getContact.mobileNumber)}`);

      const newObj = { };

      newObj.firstName = element.firstName;
      newObj.lastName = element.lastName;
      newObj.otherNames = element.otherNames;
      newObj.role = element.role;
      newObj.rank = element.rank;
      newObj.deploymentLocation = element.deploymentLocation;
      newObj.deploymentLevel = element.deploymentLevel;

      newObj.mobileNumber = getContact.mobileNumber;

      dirArr.push(newObj);
    }

    res.type('application/json');
    return res.status(201).json(dirArr);
  }

  res.type('application/json');
  return res.status(200).json({ msg: 'Wrong Template' });
};

module.exports = DirectoryWithFileID;
