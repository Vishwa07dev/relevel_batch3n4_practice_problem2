const Order = require("../models/order.model");
const User = require("../models/user.model");
const constants = require("../utils/constants")


exports.createOrder = async (req, res) => {

    const user = await User.findOne({userId: req.userId})

    const orderObj = {
        customerId: user._id,
        deliverydate: req.body.deliverydate,
        items: req.body.items,
        totalCost: req.body.totalCost,
        address: req.body.address
    }
    const newOrder = await Order.create(orderObj);
    
    user.ordersCreated.push(newOrder._id)
    await user.save();

    return res.status(200).send(newOrder)
}


exports.finAllOrders = async (req, res) => {

    try{
        const user = await User.findOne({ userId: req.userId })
        const queryObj = {};
        const ordersCreated = user.ordersCreated;

        console.log(ordersCreated);
        
        if (user.userId == 'admin') {
            if (!ordersCreated) {
                return res.status(200).send({
                message : "No orders created yet."
                });
            }
            queryObj["_id"] = { $in: ordersCreated };
        }else{
            
        }
        //Query object for fetching all the tickets created by the user
        
        const Orders = await Order.find(queryObj);
        
        res.status(200).send(Orders);

    } catch (err) {
        console.log("Some error while finding the orders ", err.message);
        res.status(500).send({
            message: "Some internal error while finding the orders."
        })
    }
    
    
}


exports.updateOrder = async (req, res) => {

    try {

        const order = await Order.findOne({"_id" : req.params.id})

        if(order.status ==  constants.status.success || order.status == constants.status.cancelled){
           
            return res.status(401).send({
                message: "Can not modify the order. It is in  canclled or success state"
            });   
        }

        order.deliverydate = req.body.deliverydate != undefined ? req.body.deliverydate : order.deliverydate,
        order.status = req.body.status != undefined ? req.body.status : order.status,
        order.items = req.body.items != undefined ? req.body.items : order.items,
        order.totalCost = req.body.totalCost != undefined ? req.body.totalCost : order.totalCost,
        order.address = req.body.address != undefined ? req.body.address : order.address,
        await order.save();
           
        res.status(200).send(order);   
   
    } catch (err) {
        console.log("Some error while updating ticket ", err.message);
        res.status(500).send({
            message: "Some internal error while updating the ticket"
        })
    }
}