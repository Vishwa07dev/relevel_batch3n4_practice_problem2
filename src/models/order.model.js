
const mongoose = require("mongoose");
const { orderStatuses } = require("../utils/constants");

/**
 * customerId 
 *       deliverydate
 *       status :  SUCCESS | IN_PROGRESS | CANCELLED
 *       items -> String
 *       totalCost
 *       address -> String
 *       createdAt|updatedAt
 * 
 */
 
const orderSchema = new mongoose.Schema(
    {
        item : {
            type : String,
            required : true
        },
        deliveryDate : {
            type : String,
            required : true,
            default : "With in 48 hours :) ....!"
        },
        address : {
            type : String,
            required : true
        },
        totalCost : {
            type : Number,
            default : 2500       //admin will update both the totalCost and status accordingly
        },
        status : {
            type : String,
            default : orderStatuses.inProgress,
            enums : [
                orderStatuses.inProgress,
                orderStatuses.cancled,
                orderStatuses.success
            ]
        },
        orderedBy : {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "User"
        }
        
    }, { timestamps: true, versionKey: false }

)

module.exports = mongoose.model("Order", orderSchema);