const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  story: {
    type: Schema.Types.ObjectId,
    ref: "Stories",
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
