const UserService = require('../services/UserService');

const UpdateUserController = async (req, res) => {
  const { val } = req.body;
  const { id } = req.params;
  const col = 'isBlocked';

  const act = await UserService.updateUser(id, col, val);

  if (act) {
    res.type('application/json');
    return res.status(201).json(act);
  }

  res.type('application/json');
  return res.status(200).json({});
};

module.exports = UpdateUserController;
