const mongoose=require("mongoose")
const Order=require("../models/order.models")
const objectConveter=require("../utils/objectConverter")
exports.placeOrder=async (req,res)=>{
    const order={
        orderId:req.body.orderId,
        deliverydate:req.body.deliverydate,
        status:req.body.status,
        items:req.body.items,
        totalCost:req.body.totalCost,
        address:req.body.address,
        customerId:req.userId
    }
    console.log("order",order)
    try
    {
        const newOrder=await Order.create(order)
        console.log("newOrder",newOrder)
        const response={
            customerId:newOrder.customerId,
            orderId:newOrder.orderId,
            deliverydate:newOrder.deliverydate,
            status:newOrder.status,
            items:newOrder.items,
            totalCost:newOrder.totalCost,
            address:newOrder.address,
            createdAt:newOrder.createdAt,
            updatedAt:newOrder.updatedAt
        }
        console.log(response)
        res.status(201).send(response)
    }
    catch(err)
    {
        console.log("Error",err.message)
        res.status(500).send({
            message:"Internal Server Error"
        });
    }
}

exports.updateOrder=async (req,res)=>{
    try{
        const order=await Order.findOne({companyId:req.params.id});
        order.deliverydate=req.body.deliverydate!=undefined?req.body.deliverydate:order.deliverydate;
        order.items=req.body.items!=undefined?req.body.items:order.items;
        order.address=req.body.address!=undefined?req.body.address:order.address;
        order.totalCost=req.body.totalCost!=undefined?req.body.totalCost:order.totalCost;
        const updateOrder=await order.save();
        const response={
            customerId:updateOrder.customerId,
            deliverydate:updateOrder.deliverydate,
            items:updateOrder.items,
            totalCost:updateOrder.totalCost,
            address:updateOrder.address,
            status:cancelOrder.status
        }
        res.status(200).send(response);
    }
    catch(err)
    {
        console.log("Error",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }    
}

exports.cancelOrder=async (req,res)=>{
    try
    {
        const order=await Order.findOne({customerId:req.params.id})
        order.status=order.status!=undefined?req.body.status:order.status;
        const cancelOrder=await order.save();
        const response={
            companyId:cancelOrder.customerId,
            deliverydate:cancelOrder.deliverydate,
            items:cancelOrder.items,
            totalCost:cancelOrder.totalCost,
            address:cancelOrder.address,
            status:cancelOrder.status
        }
        res.status(200).send(response);
    }
    catch(err)
    {
        console.log("Error while updating Order",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        });
    }
    
}

exports.findAll=async (req,res)=>{
        const queryObj=req.userId;
        try
        {
            const orders=await Order.find({customerId:queryObj});
            res.status(200).send(objectConveter.orderResponse(orders))
        }
        catch(err)
        {
            console.log("Error",err.message)
            res.status(500).send({
                message:"Internal Server Error"
            })
        }
}