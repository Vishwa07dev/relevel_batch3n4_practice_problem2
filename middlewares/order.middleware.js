const Order = require("../models/order.model");


const isValideOrderParamsId = async (req, res, next) => {
    try {
        const order = await Order.find({_id : req.params.id});
        if(!order){
            return res.status(400).send({
                message : `order id ${req.params.id} is not available in your order history.`
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

module.exports = {isValideOrderParamsId};