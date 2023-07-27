const mongoose = require("mongoose");

const writerSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    maxlength: 50,
  },
  profileImage: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  subscriber: {
    type: Boolean,
    default: false,
  },
});

const Writer = mongoose.model("Writers", writerSchema);

module.exports = Writer;
