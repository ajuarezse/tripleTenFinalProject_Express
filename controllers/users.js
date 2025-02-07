const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name } = req.body;
  User.create({ name })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser };
