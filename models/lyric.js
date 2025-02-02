const mongoose = require("mongoose");
//const validator = require("validator");

const lyric = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("lyrics", lyric);
