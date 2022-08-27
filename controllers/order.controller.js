const User = require('../models/user.model');
const Order = require('../models/order.model');
const constants = require('../utils/constants')


exports.create = async (req, res) => {
    try{

        const user = await User.findOne({userId : req.userId});
        const ordrObj = {
            customerId : user._id,
            deliveryDate : req.body.deliveryDate,
            totalCost : req.body.totalCost,
            items : req.body.items,
            address : req.body.address
        }

        const order = await Order.create(ordrObj);

        if(order){
            user.ordersCreated.push(order._id)
            await user.save()
        }

        res.status(200).send(order)

    }catch(err){
        console.log("error in creaing order");
        res.status(500).send("Internal Server Error")
    }
}

exports.getAllOrders = async (req, res) => {
    try{
        const user = User.find({userId : req.userId})

        let response = [];
        if(user.userType == constants.userType.customer){
            const ordersCreated = user.ordersCreated;
            
            for(let i=0; i<ordersCreated.length; i++){
                let order = await Order.findOne({_id : ordersCreated[i]});
                response.push(order)
            }

        }else{
            response = await Order.find();
        }
        res.status(200).send(response)

    }catch(err){
        console.log("error in creaing order");
        res.status(500).send("Internal Server Error")
    }
}


exports.cancle = async (req, res) => {
    try{
        const order = await Order.findOne({_id : req.params.id})
        order.status = constants.orderStatus.calcelled;
        order.save()

        res.status(200).send({
            message : "Successfully calcelled the order"
        })

    }catch(err){
        console.log("error in cancling order");
        res.status(500).send("Internal Server Error")
    }
}

exports.update = async (req, res) => {
    try{

        const user = await User.findOne({userId : req.userId});
        const order = await Order.findOne({_id : req.params.id});
        
        if(user.userType == constants.userType.admin){

            order.deliveryDate = req.body.deliveryDate != undefined ? req.body.deliveryDate : order.deliveryDate;
            order.status = req.body.status != undefined ? req.body.status : order.status;
            order.totalCost = req.body.totalCost != undefined ? req.body.totalCost : order.totalCost;
            order.items = req.body.items != undefined ? req.body.items : order.items;
        }

        order.address = req.body.address != undefined ? req.body.address : order.address

        const updatedOrder = await order.save()
        
        res.status(200).send(updatedOrder)

    }catch(err){
        console.log("error in updating order");
        res.status(500).send("Internal Server Error")
    }
}
