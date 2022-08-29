const User=require("../models/user.models")
const constants=require("../utils/constant.util")
const signUp=(req,res,next)=>{
    if(!req.body.name||req.body.name==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Name is not Provided"
        });
    }
    if(!req.body.userId||req.body.userId==" ")
    {
        return res.status(400).send({
            message:"Failed!!! userId is not Provided"
        });
    }
    if(!req.body.email||req.body.email==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Email is not Provided"
        });
    }
    if(!req.body.password||req.body.password==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Password is not Provided"
        });
    }
    if(!req.body.userType ||req.body.userType==" ")
    {
        return res.status(400).send({
            message:"Failed!!! userType is not Provided"
        })
    }
    if(req.body.userType==constants.userType.admin)
    {
        return res.status(400).send({
            message:"Failed!!! Only Admin is Allowed"
        })
    }
    if(req.body.userType!=constants.userType.customer)
    {
        return res.status(400).send({
            message:"Failed!!! userType is not Valid"
        })
    }

    const status=[constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected];
    if(!req.body.userStatus||req.body.userStatus==" ")
    {
        return res.status(400).send({
            message:"Failed!!! userStatus is not Provided "
        });
    }
    if(!status.includes(req.body.userStatus))
    {
        return res.status(400).send({
            message:"Failed!!! userStatus is not Valid "
        })
    }

    next();
}

const signIn=(req,res,next)=>{
    if(!req.body.userId||req.body.userId==" ")
    {
        return res.status(400).send({
            message:"Failed!!! userId is not Provided"
        })
    }
    if(!req.body.password||req.body.password==" ")
    {
        return res.status(400).send({
            message:"Failed!!! Password is not Provided"
        })
    }
    next();
}

const verifySignup={
    signUp,
    signIn
};

module.exports=verifySignup