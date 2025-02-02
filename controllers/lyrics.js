const lyric = require("../models/lyric");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name } = req.body;

  lyric
    .create({ name: name })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((error) => {
      res.status(500).send({ message: "Error from createItem", error });
    });
};

module.exports = {
  createItem,
};
