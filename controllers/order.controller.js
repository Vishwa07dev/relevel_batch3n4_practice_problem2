const User = require("../models/user.model");
const Order = require("../models/order.model");
const constants = require("../utils/constants");

exports.placeOrder = async (req, res) => {
    try{
        const orderObj = {
            userId : req.body.userId,
            item : req.body.item,
            totalCost : req.body.totalCost,
            address : req.body.address,
            deliveryDate : req.body.deliveryDate
        }
    
        const placedOrder = await Order.create(orderObj);
        if(placedOrder){
            const user = await User.findOne({userId : placedOrder.userId});
            user.orders.push(placedOrder._id);
            await user.save();
        }
    
        return res.status(200).send({
            message : "Successfully placed!!",
            item : placedOrder.item,
            expected_delivery : placedOrder.deliveryDate,
            orderId : placedOrder._id
        })
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while placing an order : ${err}`
        })
    }

};

    
exports.cancelAndUpdateOrder = async (req, res) => {   
    try{
        const order = await Order.findOne({_id : req.params.id});

        if(req.body.orderStatus === constants.orderStatus.cancelled){
            order.orderStatus = constants.orderStatus.cancelled;
            await order.save();
        
            return res.status(200).send({
                message : `Your order ${req.params.id} has been cancelled succefully.`
            });
        }
        else{
            order.item = req.body.item ? req.body.item : order.item;
            order.totalCost = req.body.totalCost ? req.body.totalCost : order.totalCost;
            order.address = req.body.address ? req.body.address : order.address;
            order.deliveryDate = req.body.deliveryDate ? req.body.deliveryDate : order.deliveryDate;
        
            const updatedOrder = await order.save();
            return res.status(200).send(updatedOrder);
        }
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while updating/cancelling an order : ${err}`
        }) 
    }
};

exports.getOrderById = async (req, res) => {
    try{
        const callingUser = await User.findOne({userId : req.userId});
        const order = await Order.findOne({});
    
    
        if(callingUser.userType === constants.userTypes.customer && callingUser.userId !== order.customerId){
            return res.status(401).send({
                message : `You are not the owner of order ${order}`
            })
        }
    
        if(!order){
            return res.status(404).send({
                message : "No orders yet."
            })
        }
    
        return res.status(200).send(order); 
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while placing an order : ${err}`
        }) 
    }
}

exports.getAllOrders = async (req, res) => {
    try{
        const callingUser = await User.findOne({userId : req.userId});
    
        // const orders = await Order.find({});
        // if (callingUser.userType === constants.userTypes.customer){
        //     orders = await Order.find({customerId : callingUser.userId}); 
        // }

        const orders = callingUser.userType === constants.userTypes.customer
            ? await Order.find({customerId : callingUser.userId})
            : await Order.find({});
        
    
        if(!orders){
            return res.status(404).send({
                message : "No orders yet."
            })
        }
    
        return res.status(200).send(orders);
    }
    catch(err){
        return res.status(500).send({
            message : `Internal server error while placing an order : ${err}`
        }) 
    }
};