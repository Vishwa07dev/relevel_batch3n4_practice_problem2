const mongoose=require("mongoose")
const constants=require("../utils/constant.util")
const orderSchema=new mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    deliverydate:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:constants.status.in_progress,
        enum:[constants.status.cancelled,constants.status.in_progress,constants.status.success]
    },
    items:{
        type:String,
        required:true
    },
    totalCost:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
        minLength:25
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
});

module.exports=mongoose.model("order",orderSchema);