const Lyric = require("../models/lyric");

// GET all lyrics
const getLyrics = (req, res) => {
  Lyric.find({})
    .then((lyrics) => res.status(200).send(lyrics))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    });
};

// CREATE a new lyric
const createLyrics = (req, res) => {
  const { songName, author, tags, verses, choruses } = req.body;

  // Validate required fields
  if (!songName) {
    return res.status(400).send({ message: "Song name is required" });
  }

  // Create the lyric
  Lyric.create({ songName, author, tags, verses, choruses })
    .then((lyric) => res.status(201).send(lyric))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    });
};

module.exports = {
  getLyrics,
  createLyrics,
};
