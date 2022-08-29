const mongoose = require('mongoose');
const constant = require("../util/constant")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updateAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    },
    userType:{
        type:String,
        required:true,
        default: constant.userTypes.user,
        enum:[constant.userTypes.admin,constant.userTypes.user]
    },
})

module.exports =  mongoose.model("User",userSchema);