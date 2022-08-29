const orderController = require("../controllers/order.controller");
const {authJwt} = require("../middlewares/index");
const {orderMiddleware} = require("../middlewares/index");

module.exports = (app) => {
    app.post("/courier_service/api/v1/orders", [authJwt.verifyToken], orderController.placeOrder);
    app.put("/courier_service/api/v1/orders/:id", [authJwt.verifyToken, orderMiddleware.isValideOrderParamsId], orderController.updateOrder);
    app.put("/courier_service/api/v1/orders/cancel/:id", [authJwt.verifyToken, orderMiddleware.isValideOrderParamsId], orderController.cancelOrder);
    app.get("/courier_service/api/v1/orders/:id", [authJwt.verifyToken, orderMiddleware.isValideOrderParamsId], orderController.getAllOrders);
    app.get("/courier_service/api/v1/orders", [authJwt.verifyToken], orderController.getAllOrders);
}