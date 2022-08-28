const orderController=require("../controllers/order.controllers")
const {authValidation,ordervalid}=require("../middelware/index")
module.exports=(app)=>{
    app.post("/orderService/api/v1/orders",[ordervalid.orderValidation,authValidation.verifyToken],orderController.placeOrder);
    app.put("/orderService/api/v1/orders/:id",[ordervalid.orderValidation,authValidation.verifyToken,authValidation.isAdminorOwner],orderController.updateOrder);
    app.put("/orderService/api/v1/orders/:id",[ordervalid.orderValidation,authValidation.verifyToken,authValidation.isAdminorOwner],orderController.cancelOrder);
    app.get("/orderService/api/v1/orders/",[authValidation.verifyToken],orderController.findAll)
}