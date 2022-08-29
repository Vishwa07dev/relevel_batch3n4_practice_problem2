const mongoose = require("mongoose");
const constants = require("../utils/constants")

const userSchema = mongoose.Schema({

  name: {
    type : String,
    required : true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: 10    
  },
  userId: {
    type : String,
    required : true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  userStatus:{
    type: String,
    default: constants.userStatuses.pending,
    enum: [constants.userStatuses.pending, constants.userStatuses.approved]
  },
  ordersCreated :{
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Order"
  },
    
},
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model("User", userSchema);