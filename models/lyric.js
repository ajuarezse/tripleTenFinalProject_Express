const mongoose = require("mongoose");

const lyricSchema = new mongoose.Schema({});

module.exports = mongoose.model("lyrics", lyricSchema);
