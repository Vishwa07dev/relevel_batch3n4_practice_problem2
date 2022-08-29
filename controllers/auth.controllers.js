const User=require("../models/user.models")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const secret=require("../configs/secret.configs")

exports.signUp=async (req,res)=>{
    
    const userObj={
        name:req.body.name,
        email:req.body.email,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,8),
        userType:req.body.userType,
        userStatus:req.body.userStatus
    }
    try{
        const newUser=await User.create(userObj)

    const response={
        name:newUser.name,
        userId:newUser.userId,
        email:newUser.email,
        password:newUser.password,
        userType:newUser.userType,
        userStatus:newUser.userStatus
    }

    res.status(201).send(response);
    }catch(err)
    {
        console.log("Error",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}   

exports.signIn=async (req,res)=>{
  try{
    const user=await User.findOne({userId:req.body.userId});
    if(user==null)
    {
        return res.status(400).send({
            message:"Failed!!!User  Doesn't Exist!!!"
        })
    }
    const verify=bcrypt.compareSync(req.body.password,user.password)
    if(!verify)
    {
            return res.status(401).send({
                message:"Password is Wrong"
            })
    }
    const token=jwt.sign({id:user.userId},secret.secretKey,{
        expiresIn:600
    });   
    
    const response={
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        userStatus:user.userStatus,
        accessToken:token
    }
    res.status(200).send(response) 
  }catch(err)
  {
    console.log("Error",err.message);
    res.status(500).send({
        message:"Internal Server Error"
    })
  }
   
}