const Like = require("../models/likeModel");
const Story = require("../models/storyModel");
const errorHandler = require("../middleware/500");

const newLike = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    const { userId } = req.body;
    const story = await Story.findById(storyId);

    console.log(storyId);
    console.log(userId);
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

    // Add the new like's _id to the likes array in the Story
    story.likes.push(like._id);

    // Save the updated Story document with the new like _id in the likes array
    await story.save();

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

const getLikesCountForStory = async (req, res) => {
  const { id } = req.params;

  try {
    const likes = await Like.find({ story: id });

    if (!likes) {
      return res.status(404).json({ error: "Likes not found" });
    }
    const likesCount = likes.length;

    res.json({ likesCount });
  } catch (error) {
    console.error("Error fetching likes count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeLike = async (req, res) => {
  try {
    const { user } = req.body;
    const { id: storyId } = req.params;

    console.log(
      "Removing Like with user:",
      user,
      "from Story with ID:",
      storyId
    );

    // First, remove the like from the Like model
    const deletedLike = await Like.findOneAndDelete({ user, story: storyId });

    console.log("Deleted Like:", deletedLike);

    // Then, remove the like's _id from the likes array in the Story model
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    const likeIndex = story.likes.indexOf(deletedLike._id);

    if (likeIndex !== -1) {
      // Remove the like's _id from the likes array
      story.likes.splice(likeIndex, 1);
      await story.save();
    }

    res.json({ message: "Like deleted successfully." });
  } catch (error) {
    console.error("Error removing Like:", error);
    res.status(500).json({ error: "Failed to delete the like." });
  }
};

module.exports = {
  newLike,
  getLikedStories,
  getLikesCountForStory,
  removeLike,
};
