/* eslint-disable no-undef */
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;
const USER_STATUS = process.env.USER_STATUS;

module.exports = { PORT, MONGO_URI, SECRET, USER_STATUS };
