const UserMetaService = require('../services/UserMetaService');

const FileUpload = async (req, res) => {
  const { uid, key, uploadedBy } = req.body;

  const postedFile = req.files[key][0];

  if (req.fileValidationError) {
    res.type('application/json');
    return res
      .status(200)
      .json(`Invalid Image Format, Please Upload ${key === 'profilePic' ? 'JPG or JPEG' : 'CSV'} File(s) Only`);
  }

  const checkMediaPath = async (path) => {
    if (path !== undefined) {
      const pathToSlice = path.path;

      const fileUrl = pathToSlice.slice(6);

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

    // create an entry into the documents table

  }

  return true;
};

module.exports = FileUpload;
