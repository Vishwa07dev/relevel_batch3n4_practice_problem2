const orderController=require("../controllers/order.controllers")
const {authValidation,ordervalid}=require("../middelware/index")
module.exports=(app)=>{
    /*
         POST   /orderService/api/v1/orders
    */
    app.post("/orderService/api/v1/orders",[ordervalid.orderValidation,authValidation.verifyToken],orderController.placeOrder);
  
    /*
         PUT /orderService/api/v1/orders/{id}
    */
    app.put("/orderService/api/v1/orders/:id",[ordervalid.orderValidation,authValidation.verifyToken,authValidation.isAdminorOwner],orderController.updateOrder);
    
    /*
         PUT /orderService/api/v1/orders/{id}
    */
    app.put("/orderService/api/v1/orders/:id",[ordervalid.orderValidation,authValidation.verifyToken,authValidation.isAdminorOwner],orderController.cancelOrder);
    
     /*
        GET /orderService/api/v1/orders/
    */
    
    app.get("/orderService/api/v1/orders/",[authValidation.verifyToken],orderController.findAll)
}