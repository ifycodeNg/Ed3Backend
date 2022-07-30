const UserMetaService = require('../services/UserMetaService');

const UpdateUserController = async (req, res) => {
  const { key, value } = req.body;
  const { id } = req.params;

//   console.log('THE DAA ==>>> ' + JSON.stringify(id));
//   console.log('THE DAA ==>>> ' + JSON.stringify(key));

//   console.log('THE DAA ==>>> ' + JSON.stringify(value));

  //   const col = 'isBlocked';

  const act = await UserMetaService.updateMeta(id, key, value);

  if (act) {
    res.type('application/json');
    return res.status(201).json(act);
  }

  res.type('application/json');
  return res.status(200).json({});
};

module.exports = UpdateUserController;
