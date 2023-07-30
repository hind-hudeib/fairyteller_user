const express = require("express");
const router = express.Router();
const likescontroller = require("../controllers/likesController");

router.get("/likeById/:id", likescontroller.getLikedStories);
router.get("/likesCount/:id", likescontroller.getLikesCountForStory);
router.post("/newlike/:id", likescontroller.newLike);
router.delete("/removelike/:id", likescontroller.removeLike);

module.exports = router;
