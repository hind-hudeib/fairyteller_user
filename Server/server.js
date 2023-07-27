const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const adminRouts = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const logInRouts = require("./routes/logInRouter");
const storyRouter = require("./routes/storyRouter");
const statisticsRouter = require("./routes/statisticsRouter");
const readerRouter = require("./routes/readerRouter");
const writerRouter = require("./routes/writerRouter");
const subscriptionRouter = require("./routes/subscriptionRouter");
const messageRouter = require("./routes/messageRouter");
const comment = require("./routes/commentsRouter");
const likesRouter = require("./routes/likesRouter");

const dbURI =
  "mongodb+srv://hindhudeib:XXHINDSAED2000@cluster0.bdu9qji.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(adminRouts);
app.use(userRouter);
app.use(logInRouts);
app.use(storyRouter);
app.use(statisticsRouter);
app.use(comment);
app.use(readerRouter);
app.use(writerRouter);
app.use(subscriptionRouter);
app.use(messageRouter);
app.use(likesRouter);

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      });
  },
};
