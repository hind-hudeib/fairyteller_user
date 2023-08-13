const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageData = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  messageContent: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  type: {
    type: String,
  },
});

const Message = mongoose.model("messageData", messageData);

module.exports = Message;
