const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/500");

const allUsers = (req, res) => {
  User.find({ is_delete: false })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.find({ _id: id, is_delete: false });
  res.json(user);
};

const newUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(401).send("Email already taken");
    }
  } catch (error) {
    errorHandler(error, req, res);
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const newUser = new User({
    role: "User",
    username: username,
    email: email,
    password: hashedPwd,
  });

  const user = await newUser.save();

  req.body = user;
  next();
};
const updateUser = async (req, res) => {
  const UserId = req.params.id;
  const updatedUserData = req.body;

  const user = await User.findById(UserId);

  if (!user || user.is_delete) {
    return res.status(401).send("User not found");
  }

  const passwordMatches = await bcrypt.compare(
    updatedUserData.password,
    user.password
  );

  if (!passwordMatches) {
    return res.status(401).send("Incorrect password");
  }

  updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);

  const updatedUser = await User.findByIdAndUpdate(UserId, updatedUserData, {
    new: true,
  });

  res.json(updatedUser);
};

// Controller function to handle the profile image upload
const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      user.profileImage = req.file.path; // Assuming req.file.path contains the file path of the uploaded image
      await user.save();
    }

    res.json({ message: "Profile image uploaded successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const subscriptionUser = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    user.subscriber = true;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    const updatedUserData = req.body;

    updatedUserData.is_delete = true;

    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);

    const user = await User.findByIdAndUpdate(UserId, updatedUserData, {
      new: true,
    });

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

module.exports = {
  allUsers,
  newUser,
  oneUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
  subscriptionUser,
};
