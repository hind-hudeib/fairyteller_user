const express = require("express");
const router = express.Router();
const messagecontroller = require("../controllers/messageController");

router.get("/message", messagecontroller.allMessages);
router.post("/sendMessage", messagecontroller.newMessage);

module.exports = router;
