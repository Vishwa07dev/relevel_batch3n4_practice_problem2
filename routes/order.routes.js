const orderController=require("../controllers/order.controllers")
const {authValidation,ordervalid}=require("../middelware/index")
module.exports=(app)=>{
    /*
                (createOrder)
         POST   /orderService/api/v1/orders
    */
    app.post("/orderService/api/v1/orders",
            [ordervalid.orderValidation,authValidation.verifyToken],
            orderController.placeOrder);
  
    /*
                (updateOrder)
         PUT /orderService/api/v1/orders/{id}
    */
    app.put("/orderService/api/v1/orders/:id",
            [authValidation.isValiduserId,ordervalid.orderValidation,authValidation.verifyToken,authValidation.isAdminorOwner],
            orderController.updateOrder);
    
    /*
                (cancelOrder)
         PUT /orderService/api/v1/orders/{id}
    */
    app.put("/orderService/api/v1/orderx/:id",
            [authValidation.isValiduserId,authValidation.verifyToken,authValidation.isAdminorOwner],
            orderController.cancelOrder);
    
     /*
                (getAllOrder)
        GET /orderService/api/v1/orders/
    */
    
    app.get("/orderService/api/v1/orders/",
            [authValidation.isValiduserId,authValidation.verifyToken],
            orderController.findAll)
}