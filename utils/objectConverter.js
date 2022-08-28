
exports.orderResponse=(orders)=>{
    orderResult=[];
    orders.forEach(order=>{
        orderResult.push({
            customerId:order.customerId,
            deliverydate:order.deliverydate,
            status:order.status,
            items:order.items,
            totalCost:order.totalCost,
            address:order.address,

        })
    });
    return orderResult;
}