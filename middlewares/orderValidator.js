const Order = require('../models/order.model');
const constants = require('../utils/constants');

const orderReqBodyValidator = (req, res, next) =>{
    if(!req.body.iteam){
        res.status(400).send({
            message : "Please provide the Iteam Name"
        })
        return;
    }
    if(!req.body.address){
        res.status(400).send({
            message : "Please provide the address"
        })
        return;
    }
    if(!req.body.totalCost){
        res.status(400).send({
            message : "Please provide the totalCost"
        })
    }
    
    next();
}

const isValidOrderId = async (req, res, next) =>{
    try{
        const order = await Order.findById(req.params.id);
        if(order == null){
            res.status(400).send({
                message : "Order is not Present !"
            });
            return;
        }
        if(order.status == constants.orderStatus.cancelled){
            res.status(400).send({
                message : "Order is Canceled you don't update the order"
            })
            return;
        }
        req.order = order;
        next();
    }catch(err){
        console.log("Some Internal error while find the orderid",err.message);
        res.status(500).send({
            message : 'Some Internal Error'
        })
    }
}

const orderValidation = {
    orderReqBodyValidator,
    isValidOrderId
}
module.exports = orderValidation;