const vadlidationOfOrderBody = async (req, res, next) => {

    try{

        if (!req.body.item) {
            return res.status(400).send({
                message: "Failed ! order item is not provided"
            });
        }
        if (!req.body.address) {
            return res.status(400).send({
                message: "Failed ! company address is not provided"
            });
        }

        next();
    } catch (err) {
        console.log("error while validating company body ", err.message);
        res.status(500).send({
            message : "Internal server error"
        });
    }
}

module.exports = {
    vadlidationOfOrderBody : vadlidationOfOrderBody
}