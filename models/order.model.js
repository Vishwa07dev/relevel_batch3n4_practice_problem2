const mongoose = require("mongoose");
const { orderStatus } = require("../utils/constants");

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        ref : "User"
    },
    deliveryDate : {
        type : mongoose.SchemaTypes.Date,
    },
    orderStatus : {
        type : String,
        default : orderStatus.active,
        enum : [orderStatus.active, orderStatus.cancelled, orderStatus.deleivered]
    },
    item : {
        type : String,
        required : true
    },
    totalCost : {
        type : Number,
        require : true
    },
    address : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
},{ timestamps : true, versionKey : false });

module.exports = mongoose.model("Order", orderSchema);