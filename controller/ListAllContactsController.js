const DirectoryService = require('../services/DirectoryService');
const ContactService = require('../services/ContactService');

const ListAllContacts = async (req, res) => {
  const getDirs = await DirectoryService.getAllDirectory();

  if (getDirs) {
    const dirArr = [];

    const dirLen = getDirs.length;

    for (let i = 0; i < dirLen; i++) {
      const element = getDirs[i];

      const getContact = await ContactService.getContactWithDirectoryID(element.id);

      // console.log(`the element ==> ${JSON.stringify(getContact.mobileNumber)}`);

      const newObj = { };

      newObj.id = element.id;
      newObj.firstName = element.firstName;
      newObj.lastName = element.lastName;
      newObj.otherNames = element.otherNames;
      newObj.role = element.role;
      newObj.rank = element.rank;
      newObj.deploymentLocation = element.deploymentLocation;
      newObj.deploymentLevel = element.deploymentLevel;

      newObj.mobileNumber = `0${getContact.mobileNumber}`;

      dirArr.push(newObj);
    }

    res.type('application/json');
    return res.status(201).json(dirArr);
  }

  res.type('application/json');
  return res.status(200).json({ msg: 'Something went wrong' });
};

module.exports = ListAllContacts;
