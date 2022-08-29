const mongoose = require("mongoose");
const constants = require("../utils/constants")


const orderSchema = mongoose.Schema({

    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "customer",
        required: true,
    },
    deliverydate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: constants.status.inProgoress,
        enum: [constants.status.inProgoress, constants.status.success, constants.status.cancelled]
    },
    items: {
        type: String,
        required: true,
        trim: true
    },
    totalCost: {
        type: Number
    },
    address: {
        type: String,
        rquired: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }

    }
}, {  versionKey: false }
)

module.exports = mongoose.model("Order", orderSchema);