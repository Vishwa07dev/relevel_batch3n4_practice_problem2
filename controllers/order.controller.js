const Order = require('../models/order.model')
const constants = require("../utils/constants")

exports.createOrder = async (req,res)=>{
    try{
        const orderObj = {
            customerId : req.user.userType == constants.userType.admin ? req.body.customerId : req.user._id,
            items : req.body.items,
            totalCost : req.body.totalCost,
            address : req.body.address,
            deliveryDate : req.body.date
        }
    
        const orderCreated = await Order.create(orderObj);

        if(orderCreated){
            const user = req.user;  // got user from JWT userID in middlewere

            user.ordersCreated.push(orderCreated._id);
            await user.save();
            
            console.log(`#### New order created by ${user.name} ####`);
            res.status(201).send(orderCreated);
        }

    }catch(err){
        console.log("#### Error while creating new order #### ", err);
        res.status(500).send({
            message : "Internal server error while creating new order"
        });
    }
}


exports.getAllOrders = async (req,res)=>{
    try{
        const queryObj = {}
    
        if(req.user.userType == constants.userType.user){
    
            if(!req.user.ordersCreated){
                return res.status(200).send({
                    message : "No orders created by the user yet"
                });
            }

            queryObj["_id"] = {$in : ordersCreated};

        }
    
        const orders = await Order.find(queryObj);
    
        res.status(200).send(orders);
    
    }catch(err){
        console.log("#### Error while getting orders #### ", err.message);
        res.status(500).send({
            message : "Internal server error while getting orders"
        });
    }
}

exports.updateOrder = async (req,res)=>{
    try{
        const order = await Order.findOne({"_id" : req.params.id});
    
        order.items = req.body.items != undefined? req.body.items : order.items;
        order.totalCost = req.body.totalCost != undefined? req.body.totalCost : order.totalCost;
        order.address = req.body.address != undefined? req.body.address : order.address;
        order.deliveryDate = req.body.deliveryDate != undefined? req.body.deliveryDate : order.deliveryDate;
        order.status = req.body.status != undefined? req.body.stauts : order.status;
    
        const updatedOrder = await Order.save()
        res.status(200).send(updatedOrder)
    }catch(err){
        console.log("#### Error while updating order ####", err);
        res.status(500).send({
            message : "Some internal error while updating the order"
        })
    }
}