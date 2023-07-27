const Reader = require("../models/readerModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../middleware/500");

const allReaders = (req, res) => {
  Reader.find({ is_delete: false })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneReader = async (req, res) => {
  const { id } = req.params;
  const user = await Reader.find({ _id: id, is_delete: false });
  res.json(user);
};

const newReader = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await Reader.findOne({ email: email });
    if (user) {
      return res.status(401).send("Email already taken");
    }
  } catch (error) {
    errorHandler(error, req, res);
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const newReader = new Reader({
    role: "reader",
    username: username,
    email: email,
    password: hashedPwd,
  });

  const user = await newReader.save();

  req.body = user;
  next();
};

const updateReader = async (req, res) => {
  const ReaderId = req.params.id;
  const updatedReaderData = req.body;

  const reader = await Reader.findById(ReaderId);

  if (!reader || reader.is_delete) {
    return res.status(401).send("Reader not found");
  }

  const passwordMatches = await bcrypt.compare(
    updatedReaderData.password,
    reader.password
  );

  if (!passwordMatches) {
    return res.status(401).send("Incorrect password");
  }

  updatedReaderData.password = await bcrypt.hash(
    updatedReaderData.password,
    10
  );

  const updatedReader = await Reader.findByIdAndUpdate(
    ReaderId,
    updatedReaderData,
    {
      new: true,
    }
  );

  res.json(updatedReader);
};

const deleteReader = async (req, res) => {
  try {
    const ReaderId = req.params.id;
    const updatedReaderData = req.body;

    updatedReaderData.is_delete = true;

    updatedReaderData.password = await bcrypt.hash(
      updatedReaderData.password,
      10
    );

    const reader = await Reader.findByIdAndUpdate(ReaderId, updatedReaderData, {
      new: true,
    });

    const updatedReader = await reader.save();

    res.json(updatedReader);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Reader" });
  }
};

module.exports = {
  allReaders,
  newReader,
  oneReader,
  updateReader,
  deleteReader,
};
