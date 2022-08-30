const Order = require('../models/order.model');
const User = require('../models/user.model');
const constants = require('../utils/constants');

exports.plcaeOrder = async (req, res)=>{
    
    try{
        const user = await User.findOne({userId : req.userId});

        const orderObj = {
            iteam : req.body.iteam,
            address : req.body.address,
            deliverydate : req.body.deliverydate,
            totalCost : req.body.totalCost,
            customerId : user._id
        }
        const orderCreated = await Order.create(orderObj);
        user.Orders.push(orderCreated._id);
        await user.save();
        console.log(orderCreated);
        res.status(200).send({
            message : "Order Created Successfully",
            data : orderCreated
        })
    }catch(err){
        console.log('some error while create the order', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }

}


exports.updateOrder = async ( req, res) =>{
    try{
        const order = req.order;
        order.iteam = (req.body.iteam)? req.body.iteam : req.order.iteam;
        order.address = (req.body.address) ? req.body.address : req.order.address;
        order.totalCost = (req.body.totalCost) ? req.body.totalCost : req.body.totalCost;
        const updateOrder = await order.save();
        res.status(200).send({
            message : "Successfully update the order",
            data : updateOrder
        })
    }catch(err){
        console.log('some error while updating the order', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.cancelOrder = async ( req, res) =>{
    try{
        const order = req.order;
        order.status = constants.orderStatus.cancelled;
        const updateOrder = await order.save();
        res.status(200).send({
            message : "Successfully cancel the order",
            data : updateOrder
        })
    }catch(err){
        console.log('some error while updating the order', err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}

exports.getAllOrder = async (req, res) =>{
    try{
        const user = await User.findOne({userId : req.userId});
        let order;
        if(user.userType === constants.userTypes.admin){
            order = await Order.find();
        }else{
            order = await Order.find({customerId : user._id});
        }
        res.status(200).send({
            message : "Orders",
            userType : user.userType,
            count : order.length,
            data : order
        })
    }catch(err){
        console.log("Some Error while fetching the orders data", err.message);
        res.status(500).send({
            message : "Some Internal Error"
        })
    }
}