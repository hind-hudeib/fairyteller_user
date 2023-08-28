const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
router.put(
  "/updateProfile/:userId",
  upload.single("profileImage"),
  userController.uploadProfileImage
);

router.get("/users", userController.allUsers);
router.post("/user", userController.newUser, authController.createToken);
router.get("/user/:id", userController.oneUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/userSubscription/:id", userController.subscriptionUser);

module.exports = router;
