const Order=require("../models/order.models")
const constants=require("../utils/constant.util")

const orderValidation=(req,res,next)=>{
    
    if(!req.body.deliverydate||req.body.deliverydate==" ")
    {
        return res.status(400).send({
            message:"Failed!!! deliverydate is not Provided"
        })
    }
    if(!req.body.items||req.body.items==" ")
    {
        return res.status(400).send({
            message:"Failed!!! items is not Provided"
        })
    }
    if(!req.body.totalCost||req.body.totalCost==" ")
    {
        return res.status(400).send({
            message:"Failed!!! totalCost is not Provided"
        })
    }
    if(!req.body.address||req.body.address==" ")
    {
        return res.status(400).send({
            message:"Failed!!! address is not Provided"
        })
    }
    if(!req.body.status||req.body.status==" ")
    {
        return res.status(400).send({
            message:"Failed!!! status is not Provided"
        })
    }
    const status=[constants.status.cancelled,constants.status.in_progress,constants.status.success];
    if(!status.includes(req.body.status))
    {
        return res.status(400).send({
            message:"Failed!!! Status is not Valid"
        })
    }
    next();
}

module.exports={orderValidation}