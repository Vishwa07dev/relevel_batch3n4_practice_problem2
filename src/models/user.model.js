
const mongoose = require("mongoose");
const { userTypes, userstatuses } = require("../utils/constants");

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
      default: userTypes.user,
      enum: [userTypes.admin, userTypes.user],
    },
    userStatus: {
        type: String,
        default: userstatuses.approved,
        enum: [
          userstatuses.approved,
          userstatuses.banned
        ],
    },
    ordersCreated: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Order",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
