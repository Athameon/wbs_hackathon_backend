const User = require("../models/userModel");

const getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      return res.json(users);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send(error.message);
    });
};

const createNewUser = async (req, res, next) => {
  try {
    const createdUser = await User.create({ ...req.body });
    return res.json(createdUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to create the user.");
  }
};

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((result) => {
      console.log(result);
      if (result) {
        return res.send("Deleted user");
      }
      return res.status(404).send("User to be deleted does not exist.");
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send(error.message);
    });
};

const updateUser = (req, res, next) => {
  const { id } = req.params;
  User.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((result) => {
      console.log(result);
      if (result) {
        return res.send(result);
      }
      return res.status(404).send("User to be updated does not exist.");
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send("Failed to update the user.");
    });
};

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
};
