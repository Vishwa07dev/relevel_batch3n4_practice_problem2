const Order = require('../models/order.model');

const validateOrderRequestBody = (req, res, next) => {
    try{
        if(!req.body.deliveryDate || !req.body.items || !req.body.totalCost || !req.body.address){
            return res.status(400).send({
                message : "Required Field missed must provide [deliveryDate, items, totalCost, address]"
            })
        }

        next()

    }catch(err){
        console.log("error in validate order body");
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

module.exports = {
    validateOrderRequestBody : validateOrderRequestBody
}
