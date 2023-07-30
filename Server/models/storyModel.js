const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cover: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  category: {
    type: String,
    required: true,
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const Story = mongoose.model("Stories", storySchema);

module.exports = Story;
