
exports.orderResponse=(orders)=>{
    orderResult=[];
    orders.forEach(order=>{
        orderResult.push({
            customerId:order.customerId,
            orderId:order.orderId,
            deliverydate:order.deliverydate,
            status:order.status,
            items:order.items,
            totalCost:order.totalCost,
            address:order.address,

        })
    });
    return orderResult;
}