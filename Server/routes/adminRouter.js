const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

// all donors
router.get("/dashboard/writers", adminController.allWriters);

router.get("/dashboard/subwriters", adminController.subWriters);

router.get("/dashboard/readers", adminController.allReaders);

// delete donor
router.put("/dashboard/upWriter/:id", adminController.deleteWriter);

router.put("/dashboard/upReader/:id", adminController.deleteReader);

router.put("/dashboard/upStory/:id", adminController.deleteStory);

// get all charities not active & not deleted
router.get("/dashboard/writersNotActive", adminController.allWritersNotActive);

router.get("/dashboard/readersNotActive", adminController.allReadersNotActive);

router.get("/dashboard/notActiveStories", adminController.allNotActiveStories);

router.put("/dashboard/restoreWriter/:id", adminController.RestoreWriter);

router.put("/dashboard/restoreReader/:id", adminController.RestoreReader);

router.put("/dashboard/restoreStory/:id", adminController.RestoreStory);

// accept org request
router.put("/dashboard/acceptOrg/:id", adminController.acceptOrg);

// reject org request
router.delete("/dashboard/rejectOrg/:id", adminController.declineOrg);

// get all donations accepts
router.get("/dashboard/activeStories", adminController.allStoriesActive);

// get all donations not accepts

// accept donation request
router.put("/dashboard/acceptStory/:id", adminController.acceptStory);

// reject donation request
router.delete("/dashboard/rejectStories/:id", adminController.rejectStories);

// get all messages
router.get("/dashboard/messages", adminController.allMessages);

router.put("/dashboard/messagesReplay/:id", adminController.addMessageReply);
// delete messages
router.delete("/dashboard/deleteMessages/:id", adminController.deleteMessage);

module.exports = router;
