const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router.post("/new_subscription", subscriptionController.newSubscription);
router.get("/all_subscription", subscriptionController.allSubscription);
router.get(
  "/one_subscription_by_Id/:id",
  subscriptionController.oneSubscriptionById
);
router.get(
  "/all_subscription_by_email/:email",
  subscriptionController.AllSubscriptionsByEmail
);
router.delete("/subscription/:id", subscriptionController.deleteSubscription);

module.exports = router;
