const Comment = require("../models/commentsModel");
const Story = require("../models/storyModel");
const User = require("../models/userModel");
const errorHandler = require("../middleware/500");

// gett
// Create a new comment
const createComment = async (req, res) => {
  try {
    const { storyId, text, userId } = req.body;

    // Create a new comment
    const comment = new Comment({ storyId, userId, text });
    await comment.save();

    // Fetch the corresponding Story document
    const story = await Story.findById(storyId);

    // Update the comments array in the Story with the new comment's _id
    story.comments.push(comment._id);

    // Save the updated Story document
    await story.save();

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

    await Story.updateOne(
      { comments: commentId }, // Find stories containing the comment ID in comments array
      { $pull: { comments: commentId } } // Remove the comment ID from comments array
    );
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

// reportComment
async function reportComment(req, res) {
  try {
    const commentId = req.params.id;

    // Check if the comment exists in the database
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the comment is already reported
    if (comment.reported) {
      return res.status(400).json({ message: "Comment already reported" });
    }

    // If the comment exists and is not reported yet, set the "reported" field to true
    comment.reported = true;
    await comment.save();

    return res.status(200).json({ message: "Comment reported successfully" });
  } catch (error) {
    console.error("Error while reporting the comment:", error);
    return res.status(500).json({
      message:
        "Something went wrong while reporting the comment. Please try again later.",
    });
  }
}

module.exports = {
  createComment,
  deleteComment,
  getCommentsByStory,
  reportComment,
};
