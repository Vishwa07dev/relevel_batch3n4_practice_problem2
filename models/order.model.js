const mongoose = require('mongoose');
const {orderStatus} = require('../utils/constants');
const orderSchema = new mongoose.Schema({
    
    iteam : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    deliverydate : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now()
        }
    },
    totalCost : {
        type : Number,
        default : 0,
        required : true
    },
    status : {
        type : String,
        enum : [orderStatus.success, orderStatus.in_progress, orderStatus.cancelled],
        default : orderStatus.in_progress
    },
    customerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    }

},{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Order",orderSchema);