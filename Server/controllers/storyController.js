const Story = require("../models/storyModel");
const User = require("../models/userModel");
const errorHandler = require("../middleware/500");

const allStorys = (req, res) => {
  Story.find({ is_delete: false, active: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const allStorysNotActive = (req, res) => {
  Story.find({ is_delete: false, active: false })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneStoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const story = await Story.findById(id).populate("likes");
    if (!story || story.is_delete || !story.active) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const AllStoryByEmail = async (req, res) => {
  const email = req.params.email;
  const story = await Story.find({
    email: email,
    is_delete: false,
    active: true,
  });
  res.json(story);
};

const AllStoryByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const story = await Story.find({
      category: category,
      is_delete: false,
      active: true,
    });
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const newStory = async (req, res) => {
  const formData = req.body;

  const newStory = new Story({
    title: formData.title,
    author: formData.author,
    email: formData.email,
    Description: formData.Description,
    Language: formData.Language,
    cover: formData.cover,
    category: formData.category,
    available: true,
    active: false,
  });
  const story = await newStory.save();
  res.json(story);
};

const updateStory = async (req, res) => {
  const id = req.params.id;
  const updatedStoryData = req.body;

  const story = await Story.findByIdAndUpdate(id, updatedStoryData, {
    new: true,
  });
  const updatedStory = await story.save();
  res.json(updatedStory);
};

const updateStoryContent = async (req, res) => {
  try {
    const storyId = req.params.id;
    const { content } = req.body;
    const story = await Story.findByIdAndUpdate(
      storyId,
      { content: content },
      { new: true }
    );
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the story." });
  }
};
const likeStory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStoryData = req.body;

    updatedStoryData.is_delete = true;

    const story = await Story.findByIdAndUpdate(id, updatedStoryData, {
      new: true,
    });

    const updatedStory = await Story.save();

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Story" });
  }
};

const getTopPicks = async (req, res) => {
  try {
    const topPicks = await Story.find()
      .populate("likes") // Populate the 'likes' field to get the related Like documents
      .sort({ "likes.length": -1 }) // Sort by the number of likes in descending order
      .limit(4); // Limit the result to the top 4 stories

    res.json(topPicks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch top picks" });
  }
};

const deleteStory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStoryData = req.body;

    updatedStoryData.is_delete = true;

    const story = await Story.findByIdAndUpdate(id, updatedStoryData, {
      new: true,
    });

    const updatedStory = await Story.save();

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Story" });
  }
};

const voteStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Check if the user has already voted for this story (using user authentication if applicable)
    // Example: Check if the user's ID exists in the story's 'likes' array.

    // If the user hasn't voted, increment the vote count and update the story
    await story.vote();

    return res
      .status(200)
      .json({ message: "Vote successful", votes: story.votes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  allStorys,
  allStorysNotActive,
  oneStoryById,
  AllStoryByEmail,
  AllStoryByCategory,
  newStory,
  updateStory,
  updateStoryContent,
  likeStory,
  getTopPicks,
  deleteStory,
  voteStory,
};
