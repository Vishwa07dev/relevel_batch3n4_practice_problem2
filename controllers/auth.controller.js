const User = require("../models/user.model");
const authConfig = require("../configs/auth.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.singup = async (req, res) => {
    try {
        const userObj = {
            name : req.body.name,
            email : req.body.email,
            userId : req.body.userId,
            password : bcrypt.hashSync(req.body.password, 8),
            userType : req.body.userType,
            orders : req.body.orders
        }

        const userCreated = await User.create(userObj);
        res.status(200).send({
                name : userCreated.name,
                email : userCreated.email,
                userId : userCreated.userId,
                orders : userCreated.orders
        });
    }
    catch(err){
        res.status(500).send({
            message : `The error is : ${err.message}`
        })
    }
}


exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({userId : req.body.userId});
        if(!user){
            return res.status(400).send({
                message : "You dont have account in Courier_Service_App."
            })
        }

        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(401).send({
                message : "You have entered the wrong password."
            })
        }

        const token = jwt.sign({id : user.userId}, authConfig.secretKey, {expiresIn : 600});

        res.status(200).send({
            name : user.name,
            email : user.email,
            userId : user.userId,
            accessToken : token
        })
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error while signing in : ${err}`
        })
    }
}