const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Reader",
    required: true,
  },
  story: {
    type: Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  // Additional fields for timestamp, etc.
  // ...
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
