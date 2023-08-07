const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
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
  profileImage: {
    type: String,
    default: "",
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

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
