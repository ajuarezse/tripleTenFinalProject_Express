const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    });
};

const createUser = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  User.create({ name })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user ID format" });
      }
      return res.status(500).send({ message: "Internal server error" });
    });
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, avatar, location, bio } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).send({ message: "Request body cannot be empty" });
  }

  if (!name && !avatar && !location && !bio) {
    return res.status(400).send({ message: "No fields provided to update" });
  }

  const updates = { name, avatar, location, bio };

  User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send({
        success: true,
        data: user,
        message: "User updated successfully",
      });
    })
    .catch((err) => {
      console.error(`Error updating user with ID ${userId}:`, err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user ID format" });
      }
      return res.status(500).send({ message: "Internal server error" });
    });
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  User.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }
      return res
        .status(200)
        .send({ success: true, message: "User deleted successfully" });
    })
    .catch((err) => {
      console.error(`Error deleting user with ID ${userId}:`, err);
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ success: false, message: "Invalid user ID format" });
      }
      return res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    });
};

module.exports = { getUsers, createUser, getUser, updateUser, deleteUser };
