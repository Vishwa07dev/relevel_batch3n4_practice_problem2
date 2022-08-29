
const Order = require("../model/order.model");

const User = require("../model/user.model");
const constant = require("../util/constant");

exports.createOrder = async (req,res)=>{
    try{
    // Read the request body and create the job object
   const orderObj = {
    items:req.body.items,
    address:req.body.address,
    user : []
    }
    const user = await User.findOne({userId:req.userId});
    if(user){
        orderObj.user.push(user._id);
        const orderCreated = await Order.create(orderObj); 
        res.status(201).send(orderCreated)
    }else{
        console.log("User not found");
    
    }
   
   
}catch(err){
    console.log("error while doing the db operations ", err.message);
    return res.status(500).send({
        message:"Internal server error"
    })
}

}

exports.updateOrder = async (req, res) => {
    try {
        // Read the request body and create the job object
        const user = await User.find({ userId: req.userId });
        const order = await Order.findOne({ _id: req.params.id })
        if (order.orderStatus == constant.orderStatus.created ||
            order.orderStatus == constant.orderStatus.in_progress) {
            if (user.userTypes == constant.userTypes.admin) {
                if (req.body.deliverydate) order.deliverydate = req.body.deliverydate;
                if (req.body.totalCost) order.totalCost = req.body.totalCost;
                if (req.body.status) order.status = req.body.status
            }
            if(user._id == order.User){
                if(req.body.items) order.items = req.body.items;
                if(req.body.address) order.address = req.body.address;
            }
        }else{
            return res.status(500).send({
                message: "this order is either cancelled or fulfilled"
            }) 
        }
        const orderUpdated = await order.save();
        res.status(201).send(orderUpdated);

    } catch (err) {
        console.log("error while doing the db operations ", err.message);
        return res.status(500).send({
            message: "Internal server error"
        })
    }

}


exports.cancelOrder = async (req, res) => {
    try {
        // Read the request body and create the job object
        const user = await User.find({ userId: req.userId });
        const order = await Order.findOne({ _id: req.params.id })
        if (order) {
            if (user.userTypes == constant.userTypes.admin ||
                user._id == order.User) {
                if (req.body.status) order.status = constant.orderStatus.cancelled;

                const orderUpdated = await order.save();
                res.status(201).send(orderUpdated);
            }
        }

    } catch (err) {
        console.log("error while doing the db operations ", err.message);
        return res.status(500).send({
            message: "Internal server error"
        })
    }

}


exports.getAll = async (req,res)=>{

    try{
        const user = await User.find({userId:req.userId});
        console.log("----------------------");
        console.log(user);
        if(user.userTypes == constant.userTypes.user){
            const order = await Order.find({_id:user._id});
                res.status(200).send(order);
        }
        const order = await Order.find();
        res.status(200).send(order);
    }catch(err){
        console.log("error while doing the db operations ", err.message);
        return res.status(500).send({
            message:"Internal server error"
        })
    }

}


exports.findByUserId = async(req,res)=>{

    try{
        const user = await User.find({userId:req.userId});
        if(user.userTypes == constant.userTypes.admin || user.userId == req.params.id){
            const order = await Order.find({userId:req.params.id});
      
            return res.status(200).send(order);  
        }else{
            res.status(500).send({
                message:"Only admin or owner can get these details"
            })
        }
     
    
    }catch(err){
      console.log("Error while fatching  the users");
      res.status(500).send({
          message:"Internal server error"
      })
    }
  }