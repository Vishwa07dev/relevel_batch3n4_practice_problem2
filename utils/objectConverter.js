// exports.userResponse=(users)=>{
//     userResult=[];
//     users.forEach(user => {
//         userResult.push({
//             name:user.name,
//             userId:user.userId,
//             email:user.email,
//             userType:user.userType,
//             userStatus:user.userStatus
//             })
//     });
//     return userResult;
// }

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