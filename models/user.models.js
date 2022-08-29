const mongoose=require("mongoose");
const constants=require("../utils/constant.util")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:constants.userType.customer,
        enum:[constants.userType.customer,constants.userType.admin]
    },
    userStatus:{
        type:String,
        default:constants.userStatus.approved,
        enum:[constants.userStatus.approved,constants.userStatus.rejected]
    }
});

module.exports=mongoose.model("user",userSchema)