const express = require("express");
const router = express.Router();
const orderController = require("../controllers/storyController");

router.get("/all_stories", orderController.allStorys);
router.get("/all_story_Not_active", orderController.allStorysNotActive);
router.get("/one_story_by_Id/:id", orderController.oneStoryById);
router.get("/all_story_by_email/:email", orderController.AllStoryByEmail);
router.get("/all_story_by_category", orderController.AllStoryByCategory);
router.post("/new_story", orderController.newStory);
router.put("/updatestory/:id", orderController.updateStory);
router.put("/updatestorycontent/:id", orderController.updateStoryContent);
router.post("/like_story/:id", orderController.likeStory);
router.get("/top_picks", orderController.getTopPicks);
router.delete("/order/:id", orderController.deleteStory);

module.exports = router;
