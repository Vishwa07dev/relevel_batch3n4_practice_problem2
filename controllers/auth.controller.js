require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

exports.signup = async (req,res)=>{

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
    };

    try{
        const userCreated = await User.create(userObj); //creating user
        
        const response = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }


        console.log(`#### User ${response.name} created ####`);
        res.status(201).send(response);
    }catch(err){
        console.log("#### error while user sign up #### ", err.message);
        res.status(500).send({
            message : "Internal server error while creating user"
        });
    }
}

exports.signin = async (req,res)=>{
    try{
        const user = await User.findOne({userId : req.body.userId})
        if(!user){
            return res.status(400).send({
                message : "Failed! userId passed dosen't exist"
            });
        }
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                message : "Wrong password"
            });
        }

        const token = jwt.sign({id: user.userId}, authConfig.secret, {expiresIn : process.env.JWT_TIME});
        console.log(`#### ${user.userType} ${user.name} logged in ####`);

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            accesToken : token
        });
    }catch(err){
        console.log("#### Error while user sign in ##### ", err.message);
        res.status(500).send({
            message : "Internal server error while user signin"
        });
    }
}