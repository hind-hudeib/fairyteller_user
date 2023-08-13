const express = require("express");
const router = express.Router();
const messagecontroller = require("../controllers/messageController");

router.get("/message", messagecontroller.allMessages);
router.get("/faq_messages", messagecontroller.getFaqMessages);
router.get("/opinion_messages", messagecontroller.getOpinionMessages);

router.post("/sendMessage", messagecontroller.newMessage);

module.exports = router;
