var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 },
];

// ARROW FUNCTION
var totalAmount = orders.reduce( (sum, order) => sum + order.amount, 0);

// reduce
//var totalAmount = orders.reduce(function(sum, order) {
//    console.log("hello", sum, order);
//    return sum + order.amount;
//}, 0);

// Normal
//var totalAmount = 0;
//for (var i = 0; i < orders.length; i++) {
//    totalAmount += orders[i].amount;
//}
console.log(totalAmount);