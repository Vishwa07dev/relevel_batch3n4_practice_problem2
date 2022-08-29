const User = require("../models/user.model");
const constants = require("../utils/constants")

exports.updateUser = async (req, res) => {

    const user = await User.findOne({userId: req.body.userId})

    if(user == null){
        return res.status(401).send({
            message: "user not found."
        })
    }
    user.userStatus = constants.userStatuses.approved;
    
    await user.save();

    return res.status(200).send({
        message: "User is approved."
    })
}


exports.delete = async(req, res) => {

    const user = await User.findOne({userId: req.boby.userId})

    if(user == null){
        return res.status(401).send({
            message: "user not found."
        })
    }

    await user.deleteOne({_id: user._id});
    
    return res.status(200).send({
        message: "User deleted successfully."
    })

}