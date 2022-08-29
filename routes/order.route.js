const orderController = require("../controllers/order.controller")
const {authJwt} = require("../middlewares")

module.exports = (app) => {

    app.post("/orderservice/api/v1/orders", 
            [authJwt.verifyToken], 
            orderController.createOrder
    );


    app.get("/orderservice/api/v1/orders", 
            [authJwt.verifyToken, authJwt.isAdminOrOwner], 
            orderController.finAllOrders
    );

    app.put("/orderservice/api/v1/orders/:id", 
            [authJwt.verifyToken, authJwt.isAdminOrOwner], 
            orderController.updateOrder
    );

}