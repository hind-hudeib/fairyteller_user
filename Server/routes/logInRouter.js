const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.post(
  "/Login_writer",
  authController.loginWriter,
  authController.createToken
);
router.post(
  "/Login_reader",
  authController.loginReader,
  authController.createToken
);
router.post(
  "/Login_admin",
  authController.loginAdmin,
  authController.createToken
);

router.post(
  "/Login_user",
  authController.loginUser,
  authController.createToken
);
router.get("/Verify_token", verifyJWT);
module.exports = router;
