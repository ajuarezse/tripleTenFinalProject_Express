const mongoose = require("mongoose");

const lyric = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("lyrics", lyric);
