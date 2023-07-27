const mongoose = require("mongoose");

const readerSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    maxlength: 50,
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
});

const Reader = mongoose.model("Readers", readerSchema);

module.exports = Reader;
