const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { USER_ROLE_BASIC } = require("../utils/config");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: USER_ROLE_BASIC,
  },
  address: String,
  city: String,
  country: String,
  zipCode: String,
  phone: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.role;
    delete returnedObject.products;
    delete returnedObject.orders;
  },
});

module.exports = mongoose.model("User", userSchema);
