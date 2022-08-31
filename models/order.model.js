const mongoose = require('mongoose')
const constants = require('../utils/constants')

const orderSchema = new mongoose.Schema({
    customerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required : true
    },
    items : {
        type : [String],
        required : true
    },
    totalCost : {
        type : Number,
        required : true,
        default : 0
    },
    address : {
        type : String,
        required : true
    },
    deliveryDate : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : constants.orderStatus.in_progress,
        enum : [constants.orderStatus.in_progress, constants.orderStatus.success, constants.orderStatus.cancelled]
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
},{versionKey : false})

module.exports = mongoose.model("Order",orderSchema)