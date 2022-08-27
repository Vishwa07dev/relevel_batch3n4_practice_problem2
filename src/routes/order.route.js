const orderController = require('../controllers/order.controller');
const { authJwt, ordervalidator } = require('../middlewares');


module.exports = (app) => {

    app.post("/orderService/api/v1/orders", [authJwt.verifyToken], orderController.createOrder);

    app.get("/orderService/api/v1/orders", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam ,authJwt.isAdminOrOwner,], orderController.getAllMyOrders);

    app.get("/orderService/api/v1/orders/", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam ,authJwt.isAdmin,], orderController.getAllOrders);

    app.get("/orderService/api/v1/order/:id", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner], orderController.findByOrderId);

    app.put("/orderService/api/v1/order/:id", [authJwt.verifyToken, authJwt.isValidUserIdInReqParam, authJwt.isAdminOrOwner], orderController.updateOrder);

    
}