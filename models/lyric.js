const mongoose = require("mongoose");

//item section
const lyricSectionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  notes: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateAdded: { type: Date, default: Date.now },
});

//item
const lyricSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  author: { type: String },
  tags: [{ type: String }],
  dateFirstEntered: { type: Date, default: Date.now },
  verses: [lyricSectionSchema],
  choruses: [lyricSectionSchema],
  otherSections: [
    {
      sectionType: { type: String, required: true },
      lyrics: [lyricSectionSchema],
    },
  ],
});

module.exports = mongoose.model("Lyric", lyricSchema);
