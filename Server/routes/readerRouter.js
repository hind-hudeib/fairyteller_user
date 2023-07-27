const express = require("express");
const router = express.Router();
const readerController = require("../controllers/readerController");
const authController = require("../controllers/authController");

router.get("/reader", readerController.allReaders);
router.post("/reader", readerController.newReader, authController.createToken);
router.get("/reader/:id", readerController.oneReader);
router.put("/reader/:id", readerController.updateReader);
router.delete("/reader/:id", readerController.deleteReader);

module.exports = router;
