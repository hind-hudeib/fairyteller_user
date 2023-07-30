const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

// Create a new comment
router.post("/addcomment", commentController.createComment);

// Delete a comment
router.delete("/deletecomment/:id", commentController.deleteComment);

// Handle report request
router.post("/report/:id", commentController.reportComment);

// Get comments for a specific story
router.get(
  "/getCommentsByStory/:storyId",
  commentController.getCommentsByStory
);

module.exports = router;
