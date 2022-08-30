const orderCotnroller = require('../controllers/order.controller');
const { authJwt, orderValidator} = require('../middlewares');
module.exports = (app) =>{

    app.post("/orderService/api/v1/orders",[ authJwt.verifyToken, orderValidator.orderReqBodyValidator], orderCotnroller.plcaeOrder);

    app.put("/orderService/api/v1/orders/:id",[authJwt.verifyToken, authJwt.isAdminOrOwner, orderValidator.orderReqBodyValidator, orderValidator.isValidOrderId], orderCotnroller.updateOrder);
    
    app.put("/orderService/api/v1/orders/cancel/:id",[authJwt.verifyToken, authJwt.isAdminOrOwner, orderValidator.isValidOrderId], orderCotnroller.cancelOrder);

    app.get("/orderService/api/v1/orders",[authJwt.verifyToken], orderCotnroller.getAllOrder);
}