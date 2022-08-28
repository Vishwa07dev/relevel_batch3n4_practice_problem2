const orderController=require("../controllers/order.controllers")
const {verifyToken}=require("../middelware/index")
module.exports=(app)=>{
    app.post("/orderService/api/v1/orders",[verifyToken.verifyToken],orderController.placeOrder);
    app.put("/orderService/api/v1/orders/:id",[verifyToken.verifyToken,verifyToken.isAdminorOwner],orderController.updateOrder);
    app.put("/orderService/api/v1/orders/:id",[verifyToken.verifyToken,verifyToken.isAdminorOwner],orderController.cancelOrder);
    app.get("/orderService/api/v1/orders/",[verifyToken.verifyToken],orderController.findAll)
}