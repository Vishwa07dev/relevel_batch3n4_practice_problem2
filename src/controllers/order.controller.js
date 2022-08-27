const { isAdmin } = require('../middlewares/authJwt');
const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {

    try {

        const orderObj = {
            item : req.body.item,
            address : req.body.address,
            totalCost : req.body.totalCost,
        }

        const orderCreated = await Order.create(orderObj);

        res.status(201).send(orderCreated);
    } catch (err) {
        console.log("Error while doing the DB operations", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.getAllMyOrders = async (req, res) => {

    try {

        const queryObj = {};
        const ordersCreated = req.user.orderCreated
        queryObj["_id"] = { $in: ordersCreated};
    
        const orders = await Order.find(queryObj);
    
        res.status(200).send(orders)
    
        
    } catch (err) {

        console.log("some error while fetching all your orders", err.message);
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
        const order = await order.findOne({"_id": req.params.id});

        order.item = req.body.item != undefined ? req.body.item : order.item;
        if(isAdmin){
            order.status = req.body.status != undefined ? req.body.status : order.status;
            order.address = req.body.address != undefined ? req.body.status : order.address;
        } else if(!isAdmin){

        }
        
        const updatedJob = await job.save();

        res.status(200).send(updatedJob);

    } catch (err) {
        console.log("some error while updating job", err.message);
        res.status(500).send({
            message : "Some internal error while updating the job"
        })
    }
}