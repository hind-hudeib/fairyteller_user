const Subscription = require("../models/subscriptionModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/500");

const newSubscription = async (req, res, next) => {
  const formData = req.body;

  const hashedcardNum = await bcrypt.hash(formData.cardNumber, 10);
  const hashedsecurityCode = await bcrypt.hash(formData.securityCode, 10);

  const newSub = new Subscription({
    userId: formData.userId,
    name: formData.name,
    email: formData.email,
    cardNumber: hashedcardNum,
    expirationDate: formData.expirationDate,
    securityCode: hashedsecurityCode,
    paymentDetails: formData.paymentDetails,
  });

  const sub = await newSub.save();
  res.json(sub);
  console.log(formData);
};

const allSubscription = (req, res) => {
  Story.find({ is_delete: false })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneSubscriptionById = async (req, res) => {
  const id = req.params.id;
  const sub = await Subscription.find({
    _id: id,
    is_delete: false,
  });
  res.json(sub);
};

const AllSubscriptionsByEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const story = await Subscription.find({
    email: email,
    is_delete: false,
  });
  res.json(story);
};

const deleteSubscription = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSubData = req.body;

    updatedSubData.is_delete = true;

    const sub = await Subscription.findByIdAndUpdate(id, updatedSubData, {
      new: true,
    });

    const updatedSub = await Subscription.save();

    res.json(updatedSub);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Story" });
  }
};

module.exports = {
  allSubscription,
  oneSubscriptionById,
  AllSubscriptionsByEmail,
  newSubscription,
  deleteSubscription,
};
