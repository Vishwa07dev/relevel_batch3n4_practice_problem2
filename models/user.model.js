const mongoose = require("mongoose");
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minLength: 5,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
    },
    userType: {
      type: String,
      default: constants.userType.customer,
      enum: [constants.userType.admin, constants.userType.customer]
    },
    ordersCreated: {
      type: [mongoose.SchemaType.ObjectId],
      ref: "Order"
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);