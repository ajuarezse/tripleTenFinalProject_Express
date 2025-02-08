const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic Profile Information
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: "https://example.com/default-avatar.png",
  },
  bio: {
    type: String,
    maxLength: 500,
  },

  // Authentication
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), // Basic email validation
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Social Features
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likedLyrics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lyric",
    },
  ],
  contributedLyrics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lyric",
    },
  ],

  // Additional Fields
  lastLogin: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
