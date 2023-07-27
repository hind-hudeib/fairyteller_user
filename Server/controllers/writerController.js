const Writer = require("../models/writerModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/500");

const allWriters = (req, res) => {
  Writer.find({ is_delete: false })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneWriter = async (req, res) => {
  const { id } = req.params;
  const user = await Writer.find({ _id: id, is_delete: false });
  res.json(user);
};

const newWriter = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await Writer.findOne({ email: email });
    if (user) {
      return res.status(401).send("Email already taken");
    }
  } catch (error) {
    errorHandler(error, req, res);
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const newWriter = new Writer({
    role: "writer",
    username: username,
    email: email,
    password: hashedPwd,
  });

  const user = await newWriter.save();

  req.body = user;
  next();
};
const updateWriter = async (req, res) => {
  const writerId = req.params.id;
  const updatedWriterData = req.body;

  const writer = await Writer.findById(writerId);

  if (!writer || writer.is_delete) {
    return res.status(401).send("Writer not found");
  }

  const passwordMatches = await bcrypt.compare(
    updatedWriterData.password,
    writer.password
  );

  if (!passwordMatches) {
    return res.status(401).send("Incorrect password");
  }

  updatedWriterData.password = await bcrypt.hash(
    updatedWriterData.password,
    10
  );

  const updatedWriter = await Writer.findByIdAndUpdate(
    writerId,
    updatedWriterData,
    {
      new: true,
    }
  );

  res.json(updatedWriter);
};

const subscriptionUser = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(userId);
    const user = await Writer.findById(userId);
    console.log(user);
    user.subscriber = true;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update User" });
  }
};

const deleteWriter = async (req, res) => {
  try {
    const WriterId = req.params.id;
    const updatedWriterData = req.body;

    updatedWriterData.is_delete = true;

    updatedWriterData.password = await bcrypt.hash(
      updatedWriterData.password,
      10
    );

    const writer = await Writer.findByIdAndUpdate(WriterId, updatedWriterData, {
      new: true,
    });

    const updatedWriter = await Writer.save();

    res.json(updatedWriter);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Writer" });
  }
};

module.exports = {
  allWriters,
  newWriter,
  oneWriter,
  updateWriter,
  deleteWriter,
  subscriptionUser,
};
