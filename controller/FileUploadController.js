const UserMetaService = require('../services/UserMetaService');

const FileUploadController = async (req, res) => {
  const { uid, key } = req.body;

  // const postedFile = req.file;

  const postedFile = req.files[key][0];


  // console.log('posted File ==> ' + JSON.stringify(postedFile));

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
    
  }

  // console.log('THE UPLOADED FILE PATH ===> ' + JSON.stringify(uploadedFilePath));
  // if (uploadedFilePath) {
  //   const updateUsermeta = await UserMetaService.createMeta(uid, key, uploadedFilePath);
  //   if (updateUsermeta) {
  //     res.type('application/json');
  //     return res.status(201).json(updateUsermeta);
  //   }
  // }

  return true;
};

module.exports = FileUploadController;
