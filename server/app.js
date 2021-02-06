const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

// import API
const categoryRouter = require("./controllers/category");
const productRouter = require("./controllers/product");
const userRouter = require("./controllers/user");
const rootRouter = require("./controllers/root");

// middlewares & others
const config = require("./utils/config");
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
  .then(() => console.info("🍀 connected to MongoDB."))
  .catch((error) =>
    console.error("Error connecting to MongoDB: ", error.message)
  );

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// routes
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api", rootRouter);

app.use(middleware.errorHandler);

module.exports = app;
