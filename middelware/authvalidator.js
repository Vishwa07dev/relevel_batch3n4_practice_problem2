const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const constants=require("../utils/constant.util")
const User=require("../models/user.models")
const Order=require("../models/order.models")
const secretConfig=require("../configs/secret.configs")
const verifyToken=async (req,res,next)=>{

    const token=req.headers["x-access-token"];
   
    if(!token)
    {
        return res.status(403).send({
            message:"Failed!!! Token is not provided"
        })
    }
    jwt.verify(token,secretConfig.secretKey,(err,decoded)=>{
        if(err)
        {
            return res.status(401).send({
                message:"UnAuthorized!!!"
            });
        }
        req.userId=decoded.id;
        next();
    });
}
const isAdminorOwner=async (req,res,next)=>{
    // const user=User.findOne({userId:req.params.id});
    // const order=Order.findOne({customerId:req.params.id})
    // if(user.userId!=order.customerId)
    // {
    //     return res.status(400).send({
    //         message:"User is not Owner"
    //     })
    // }

    try{
        const user=await User.findOne({userId:req.userId});
        if(user.userType==constants.userType.admin||user.userId==req.params.id)
        {
            next();
        }
        else
        {
            res.status(403).send({
                message:"Only admin or the owner is allowed to make this call"
            })
        }
    }catch(err)
    {
        console.log("Error while reading user info",err.message)
        res.status(500).send({
            message:"Internal Server Error "
        })
    }

}
const authJwt={
    verifyToken,
    isAdminorOwner
}

module.exports=authJwt