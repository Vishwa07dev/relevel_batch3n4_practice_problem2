const Order = require('../models/order.model')
const constants = require('../utils/constants')

const validateNewOrderBody = async (req,res,next)=>{
    
    if(req.user.userType == constants.userType.admin && !req.body.customerId){
        return res.status(400).send({
            message: "Failed ! Customer Id not provided"
        });
    }

    if (!req.body.items) {
        return res.status(400).send({
            message: "Failed ! order items are not provided"
        });
    }

    if (!req.body.totalCost) {
        return res.status(400).send({
            message: "Failed ! order cost is not provided"
        });
    }

    if (!req.body.address) {
        return res.status(400).send({
            message: "Failed ! order address is not provided"
        });
    }

    if (!req.body.deliveryDate) {
        return res.status(400).send({
            message: "Failed ! order delivery date is not provided"
        });
    }

    next();
}

const isValidOwnerOfTheOrder = async (req,res,next) =>{
    const user = req.user
    const order = await Order.findOne({_id : req.params.id});

    if(!order){
        return res.status(400).send({
            message : "OrderId provided does not match any order"
        });
    }

    if (user.userType == constants.userType.admin || order.customerId.equals(user._id)){
        req.order = order
        next();
    }else{
        return res.status(401).send({
            message : "only ADMIN and OWNER are allowed"
        });
    }
}

const validateUpdateOrderBody = async (req,res,next)=>{
    const order = req.order;
    if (order.status != constants.orderStatus.in_progress){
        return res.status(403).send({
            message : "Only orders that are in progress can be updated"
        });
    }

    const acceptedStatus = [constants.orderStatus.in_progress, constants.orderStatus.success, constants.orderStatus.cancelled]

    if(req.body.status && !acceptedStatus.includes(req.body.status)){
        return res.status(403).send({
            message : "Invalid order status provided"
        });
    }

    next();

}


const verifyorder = {
    validateNewOrderBody : validateNewOrderBody,
    isValidOwnerOfTheOrder : isValidOwnerOfTheOrder,
    validateUpdateOrderBody : validateUpdateOrderBody
};

module.exports = verifyorder;