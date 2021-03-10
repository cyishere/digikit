const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({});

orderSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Order", orderSchema);
