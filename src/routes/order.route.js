const orderController = require('../controllers/order.controller');
const { authJwt, ordervalidator } = require('../middlewares');


module.exports = (app) => {

    app.post("/orderService/api/v1/orders", [authJwt.verifyToken, ordervalidator.vadlidationOfOrderBody], orderController.createOrder);

    app.get("/orderService/api/v1/order", [authJwt.verifyToken, authJwt.isAdminOrOwner], orderController.getAllMyOrders);

    app.get("/orderService/api/v1/orders", [authJwt.verifyToken, authJwt.isAdmin,], orderController.getAllOrders);

    app.get("/orderService/api/v1/order/:id", [authJwt.verifyToken, authJwt.isValidOrderIdInReqParam, authJwt.isAdminOrOwner], orderController.findByOrderId);

    app.put("/orderService/api/v1/order/:id", [authJwt.verifyToken, authJwt.isValidOrderIdInReqParam, authJwt.isAdminOrOwner], orderController.updateOrder);
 
}