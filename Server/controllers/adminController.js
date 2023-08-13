const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/500");
const Writer = require("../models/writerModel");
const Reader = require("../models/readerModel");
const User = require("../models/userModel");
const Story = require("../models/storyModel");
const Message = require("../models/messageModel");
const Comment = require("../models/commentsModel");

// get all Users from db
const allUsers = (req, res) => {
  User.find({ is_delete: false })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const subUsers = (req, res) => {
  User.find({ subscriber: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const allReaders = (req, res) => {
  Reader.find({ is_delete: false })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    console.log(user);
    user.is_delete = true;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

const deleteReader = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Reader.findById(userId);
    console.log(user);
    user.is_delete = true;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

const deleteStory = async (req, res) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    story.is_delete = true;

    const updatedStory = await story.save();

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

// get all chairties not active
const allUsersNotActive = (req, res) => {
  User.find({ is_delete: true, active: false })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const allReadersNotActive = (req, res) => {
  Reader.find({ is_delete: true, active: false })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const allNotActiveStories = (req, res) => {
  Story.find({ is_delete: false, active: false })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const RestoreUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    console.log(user);
    user.is_delete = false;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

// *********   Restore Reader
const RestoreReader = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Reader.findById(userId);
    console.log(user);
    user.is_delete = false;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

// *********   Restore Story
const RestoreStory = async (req, res) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    story.is_delete = false;

    const updatedStory = await story.save();

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};
// accept org request
const acceptOrg = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Charity.findById(userId);
    console.log(user);
    user.active = true;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};
// reject org request
const declineOrg = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedDocument = await Charity.findByIdAndDelete(userId);
    console.log("Document deleted successfully:", deletedDocument);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

const allStoriesActive = (req, res) => {
  Story.find({ is_delete: false, active: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

// get all donation with active false and is_delete : false

// accept donation request
const acceptStory = async (req, res) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    story.active = true;
    const updatedStory = await story.save();

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update donation request" });
  }
};

// reject donation request
const rejectStories = async (req, res) => {
  try {
    const storyId = req.params.id;
    const deletedDocument = await Story.findByIdAndDelete(storyId);
    console.log("Document deleted successfully:", deletedDocument);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete donation request" });
  }
};

// get all messages
const allMessages = (req, res) => {
  Message.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const addMessageReply = async (req, res) => {
  try {
    const id = req.params.id;
    const { reply } = req.body;

    console.log(reply);
    const message = await Message.findByIdAndUpdate(id, {
      reply: reply,
    });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sent the replay." });
  }
};

// delete Messages
const deleteMessage = async (req, res) => {
  try {
    const messageID = req.params.id;
    const deletedDocument = await Message.findByIdAndDelete(messageID);
    console.log("Document deleted successfully:", deletedDocument);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Message " });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching comments." });
  }
};

// Controller to get reported comments
const getReportedComments = async (req, res) => {
  try {
    const reportedComments = await Comment.find({ reported: true });
    res.status(200).json(reportedComments);
  } catch (error) {
    console.error("Error fetching reported comments:", error);
    res.status(500).json({
      message: "Something went wrong while fetching reported comments.",
    });
  }
};

// accept comment
async function acceptComment(req, res) {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.reported) {
      return res.status(400).json({ message: "Comment is not reported" });
    }

    comment.reported = false; // Mark the comment as not reported (accepted)
    await comment.save();

    res.json({ message: "Comment accepted and removed from reported list" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// delete comment
async function deleteComment(req, res) {
  const { commentId } = req.params; // Use req.params.commentId instead of req.params.id

  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
const selectMessageType = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    const message = await Message.findByIdAndUpdate(id, {
      type: type,
    });

    console.log(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to select message type." });
  }
};
module.exports = {
  allUsers,
  subUsers,
  allReaders,
  deleteUser,
  deleteReader,
  deleteStory,
  allUsersNotActive,
  allReadersNotActive,
  allNotActiveStories,
  RestoreReader,
  RestoreUser,
  RestoreStory,
  acceptOrg,
  declineOrg,
  allStoriesActive,
  acceptStory,
  rejectStories,
  allMessages,
  addMessageReply,
  deleteMessage,
  getAllComments,
  getReportedComments,
  acceptComment,
  deleteComment,
  selectMessageType,
};
