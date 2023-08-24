const Admin = require("../models/adminModel");
const Writer = require("../models/writerModel");
const Reader = require("../models/readerModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/500");

const createToken = (req, res) => {
  const user = req.loggedInUser; // Get the user object from the request
  const accessToken = jwt.sign(
    {
      username: user.username, // Use the username from the user object
      userId: user._id, // Use the userId from the user object
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1w" }
  );

  res.json({ Token: accessToken, data: user });
};

const loginWriter = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Writer.findOne({ email: email });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      user.is_delete
    ) {
      return res.status(401).send("incorrect email or password");
    }
    req.body = user;
    next();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).send("Email not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Incorrect password");
    }

    if (user.is_delete) {
      return res.status(401).send("This account has been deleted");
    }

    req.loggedInUser = user;
    next();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email: email });

    console.log(user);
    if (!user) {
      return res.status(401).send("incorrect email or password");
    } else if (!(await bcrypt.compare(password, user.password))) {
      console.log("pass not match");
    } else if (user.is_delete) {
      console.log("deleted");
    }
    req.loggedInUser = user;

    next();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const loginReader = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Reader.findOne({ email: email });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      user.is_delete
    ) {
      return res.status(401).send("incorrect email or password");
    }
    req.loggedInUser = user;
    next();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = {
  loginWriter,
  loginAdmin,
  loginUser,
  loginReader,
  createToken,
};
