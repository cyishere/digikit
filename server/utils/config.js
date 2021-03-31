/* eslint-disable no-undef */
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;
const USER_ROLE_ADMIN = process.env.USER_ROLE_ADMIN;
const USER_ROLE_BASIC = process.env.USER_ROLE_BASIC;

module.exports = { PORT, MONGO_URI, SECRET, USER_ROLE_ADMIN, USER_ROLE_BASIC };
