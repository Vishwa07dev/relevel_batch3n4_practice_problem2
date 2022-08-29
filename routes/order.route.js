const orderController = require("../controller/order.controller");
const {authJwt} = require("../middleware");

module.exports =(app)=>{
   // order creation
   app.post("/orderService/api/v1/orders",[authJwt.verifyToken],orderController.createOrder);
 // order updation
   app.put("/orderService/api/v1/orders/:id",[authJwt.verifyToken,authJwt.isAdmin],orderController.updateOrder);
 // order deletion
   app.put("/orderService/api/v1/orders/:id",[authJwt.verifyToken,authJwt.isAdmin],orderController.cancelOrder);
// getting order
app.get("/orderService/api/v1/orders",[authJwt.verifyToken],orderController.getAll);

app.get("/orderService/api/v1/orders/:id",[authJwt.verifyToken],orderController.findByUserId);
  

}
