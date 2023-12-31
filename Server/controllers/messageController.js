const Message = require("../models/messageModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/500");

const allMessages = (req, res) => {
  Message.find({ is_delete: false })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const newMessage = async (req, res) => {
  const formData = req.body;

  const newMessage = new Message({
    name: formData.name,
    email: formData.email,
    messageContent: formData.messageContent,
  });
  const message = await newMessage.save();
  res.json(message);
  console.log(formData);
};

const getFaqMessages = (req, res) => {
  const messageType = "faq";

  Message.find({ type: messageType })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const getOpinionMessages = (req, res) => {
  const messageType = "opinion";

  Message.find({ type: messageType })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

module.exports = {
  allMessages,
  newMessage,
  getFaqMessages,
  getOpinionMessages

};
