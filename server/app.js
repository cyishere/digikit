const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

// import API
const carRouter = require("./controllers/car");
const userRouter = require("./controllers/user");

// middlewares & others
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

/**
 * DATABASE Setting
 */
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("🍀 connected to MongoDB."))
  .catch((error) =>
    logger.error("Error connecting to MongoDB: ", error.message)
  );

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// routes
app.use("/api/car", carRouter);
app.use("/api/user", userRouter);

module.exports = app;
