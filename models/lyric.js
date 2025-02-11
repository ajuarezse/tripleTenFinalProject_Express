const mongoose = require("mongoose");

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

const lyricSchema = new mongoose.Schema(
  {
    songName: { type: String, required: true },
    author: { type: String },
    tags: [{ type: String, minlength: 2, maxlength: 20 }],
    dateFirstEntered: { type: Date, default: Date.now },
    verses: [lyricSectionSchema],
    choruses: [lyricSectionSchema],
    otherSections: [
      {
        sectionType: { type: String, required: true },
        lyrics: [lyricSectionSchema],
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

lyricSchema.index({ songName: "text" });

module.exports = mongoose.model("Lyric", lyricSchema);
