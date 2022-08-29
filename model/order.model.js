const mongoose = require("mongoose");
const constant = require("../util/constant");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    deliverydate:{
        type:String
    },

    status:{
        type:String,
        required:true,
        default: constant.orderStatus.created,
        enum:[ constant.orderStatus.created,constant.orderStatus.success,constant.orderStatus.in_progress,constant.orderStatus.cancelled]
    },
    items:{
        type:String
    },
    totalCost:{
        type:Number
    },
    address:{
        type:String
    }
});

const orderModel = new mongoose.model('Order',orderSchema);
module.exports = orderModel;