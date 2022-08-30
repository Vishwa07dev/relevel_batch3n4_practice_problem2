const mongoose = require("mongoose");
const { userTypes } = require("../utils/constants");

const userSchema = new mongoose.Schema({
   
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: [userTypes.customer, userTypes.admin],
      default: userTypes.customer,
    },
    Orders: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Order",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
