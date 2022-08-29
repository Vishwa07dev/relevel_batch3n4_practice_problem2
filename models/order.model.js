const mongoose = require("mongoose");
const constants = require('../utils/constants')

const orderSchema = new mongoose.Schema({
    customerId: {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    },

    deliveryDate: {
        type: Date,
        required: true,
        trim: true,
    },
    items : {
        type : [String],
        required : true
    },

    status: {
        type: String,
        default: constants.orderStatus.in_progress,
        enum: [constants.orderStatus.calcelled, constants.orderStatus.success, constants.orderStatus.in_progress]
    },
    totalCost: {
        type: Number,
        required: true,
        trim: true,
    },
    address : {
        type : String,
        required : true,
        trim: true,
    }

}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Order", orderSchema);