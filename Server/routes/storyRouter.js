const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

router.get("/all_stories", storyController.allStorys);
router.get("/all_story_Not_active", storyController.allStorysNotActive);
router.get("/one_story_by_Id/:id", storyController.oneStoryById);
router.get("/all_story_by_email/:email", storyController.AllStoryByEmail);
router.get("/all_story_by_category", storyController.AllStoryByCategory);
router.post("/new_story", storyController.newStory);
router.put("/updatestory/:id", storyController.updateStory);
router.put("/updatestorycontent/:id", storyController.updateStoryContent);
router.post("/like_story/:id", storyController.likeStory);
router.get("/top_picks", storyController.getTopPicks);
router.delete("/order/:id", storyController.deleteStory);
router.post("/vote/:storyId", storyController.voteStory);

module.exports = router;
