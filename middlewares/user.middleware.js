const User = require("../models/user.model");


const isValideCustParamsId = async (req, res, next) => {
    try {
        const user = await User.find({customerId : req.params.id});
        if(!user){
            return res.status(400).send({
                message : `We dont have any customer with the user id : ${req.params.id}`
            })
        }
        next();
    }
    catch(err){
        return res.status(500).send({
            message : `Internal error : ${err}`
        })
    }
}

module.exports = {isValideCustParamsId};