const orderController = require('../controllers/order.controller');
const {authJwt, verifyOrder} = require('../middlewares')

module.exports = (app)=>{
    app.post("/orderService/api/v1/orders/", [authJwt.verifyToken, verifyOrder.validateNewOrderBody], orderController.createOrder);
    app.get("/orderService/api/v1/orders/", [authJwt.verifyToken], orderController.getAllOrders)
    app.put("/orderService/api/v1/orders/:id", [authJwt.verifyToken, verifyOrder.isValidOwnerOfTheOrder, verifyOrder.validateUpdateOrderBody], orderController.updateOrder)
}