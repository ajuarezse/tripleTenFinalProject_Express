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
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Name, email, and password are required" });
  }
  User.create({ name, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
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

  const updates = {};
  if (name) updates.name = name;
  if (avatar) updates.avatar = avatar;
  if (location) updates.location = location;
  if (bio) updates.bio = bio;

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
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
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
