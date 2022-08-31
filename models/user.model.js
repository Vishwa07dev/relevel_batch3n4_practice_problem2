const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userType.user,
        enum : [constants.userType.user, constants.userType.admin]
    },
    ordersCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Order"
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () => {return Date.now()}
    },
    updatedAt : {
        type : Date,
        default : () => {return Date.now()}
    }
});

module.exports = mongoose.model("User",userSchema);