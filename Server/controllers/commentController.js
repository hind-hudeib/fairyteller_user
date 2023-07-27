const Comment = require("../models/commentsModel");
const Story = require("../models/storyModel");
const Reader = require("../models/readerModel");
const errorHandler = require("../middleware/500");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { storyId, text, userId } = req.body;
    const comment = new Comment({ storyId, userId, text });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment." });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { userId } = req.body;

    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      userId: userId,
    });

    if (!comment) {
      return res.status(404).json({
        error: "Comment not found or you do not have permission to delete it.",
      });
    }

    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment." });
  }
};

// Get comments for a specific story
const getCommentsByStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;

    const comments = await Comment.find({ storyId });

    res.json(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the comments." });
  }
};
module.exports = {
  createComment,
  deleteComment,
  getCommentsByStory,
};
