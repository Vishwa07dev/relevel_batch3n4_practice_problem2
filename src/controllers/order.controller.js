const { isAdmin } = require('../middlewares/authJwt');
const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {

    try {

        const orderObj = {
            item : req.body.item,
            address : req.body.address,
            orderedBy : req.user._id
        }

        const orderCreated = await Order.create(orderObj);

        const user = req.user
        user.ordersCreated.push(orderCreated._id);
        await user.save();

        res.status(201).send(orderCreated);
    } catch (err) {
        console.log("Error while doing the DBb operations", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.getAllMyOrders = async (req, res) => {

    try {

        const queryObj = {};
        const ordersCreated = req.user.ordersCreated
        queryObj["_id"] = { $in: ordersCreated};
    
        const orders = await Order.find(queryObj);
    
        res.status(200).send(orders)
    
        
    } catch (err) {

        console.log("some error while getting all your orders", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }
    
}

exports.findByOrderId = async (req, res) => {

    try {
        const order = await Order.find({ "_id": req.params.id });
      
        return res.status(200).send(order);

    } catch (err) {
        console.log("Error while searching the order ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find();

        res.status(200).send(orders);
    } catch (err) {

        console.log("some error while fetching all orders", err.message);
        res.status(500).send({
            message : "Some internal error "
        });
    }
    
}


exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findOne({"_id": req.params.id});

        order.item = req.body.item != undefined ? req.body.item : order.item;
        if(isAdmin){
            order.status = req.body.status != undefined ? req.body.status : order.status;
            order.totalCost = req.body.totalCost != undefined ? req.body.totalCost : order.totalCost;
            order.deliveryDate = req.body.deliveryDate != undefined ? req.body.deliveryDate : order.deliveryDate;
        }
        order.address = req.body.address != undefined ? req.body.status : order.address;
        
        const updatedOrder = await order.save();

        res.status(200).send(updatedOrder);

    } catch (err) {
        console.log("some error while updating order", err.message);
        res.status(500).send({
            message : "Some internal error while updating the order"
        })
    }
}