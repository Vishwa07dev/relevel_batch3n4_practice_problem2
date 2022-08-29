const orderController = require('../controllers/order.controller');
const {authJwt} = require('../middlewares/index');
const {validateOrder} = require('../middlewares')

module.exports = (app) => {

    app.post('/orderService/api/v1/orders', [authJwt.verifyToken, validateOrder.validateOrderRequestBody], orderController.create);

    // app.put('/orderService/api/v1/orders/:id', [authJwt.verifyToken, authJwt.isAdminOrOwnerOfOrder], orderController.update);

    app.put('/orderService/api/v1/orders/:id', [authJwt.verifyToken, authJwt.isAdminOrOwnerOfOrder], orderController.cancle);

    app.get('/orderService/api/v1/orders', [authJwt.verifyToken], orderController.getAllOrders);

}