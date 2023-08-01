const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

// all donors
router.get("/dashboard/users", adminController.allUsers);

router.get("/dashboard/subusers", adminController.subUsers);

router.get("/dashboard/readers", adminController.allReaders);

// delete donor
router.put("/dashboard/deleteuser/:id", adminController.deleteUser);

router.put("/dashboard/upReader/:id", adminController.deleteReader);

router.put("/dashboard/upStory/:id", adminController.deleteStory);

// get all charities not active & not deleted
router.get("/dashboard/usersNotActive", adminController.allUsersNotActive);

router.get("/dashboard/readersNotActive", adminController.allReadersNotActive);

router.get("/dashboard/notActiveStories", adminController.allNotActiveStories);

router.put("/dashboard/restoreUser/:id", adminController.RestoreUser);

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

// get all Comments
router.get("/dashboard/comments", adminController.getAllComments);

// get all Comments
router.get("/dashboard/reportedcomments", adminController.getReportedComments);

// accept comment
router.put(
  "/dashboard/acceptComment/:commentId",
  adminController.acceptComment
);

// delete Comment
router.delete(
  "/dashboard/deleteComment/:commentId",
  adminController.deleteComment
);

module.exports = router;
