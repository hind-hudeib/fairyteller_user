const Like = require("../models/likeModel");
const Story = require("../models/storyModel");
const errorHandler = require("../middleware/500");

const newLike = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    const { userId } = req.body;
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    const existingLike = await Like.findOne({ story: storyId, user: userId });
    if (existingLike) {
      return res.status(409).json({ error: "Like already exists" });
    }

    const like = new Like({
      story: storyId,
      user: userId,
    });

    await like.save();
    res.status(201).json({ message: "Like created successfully", like });
  } catch (error) {
    console.error("Error creating like:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLikedStories = async (req, res) => {
  try {
    const userId = req.params.id;

    const likes = await Like.find({ user: userId });
    const storyIds = likes.map((like) => like.story);

    const stories = await Story.find({ _id: { $in: storyIds } });

    res.json(stories);
  } catch (error) {
    console.error("Error fetching liked stories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeLike = async (req, res) => {
  try {
    const { user } = req.body; // Use the correct field name for user
    const { id: storyId } = req.params;

    // Now use the `user` to perform the delete operation
    await Like.deleteOne({ user });

    res.json({ message: "Like deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the like." });
  }
};

module.exports = {
  newLike,
  getLikedStories,
  removeLike,
};
