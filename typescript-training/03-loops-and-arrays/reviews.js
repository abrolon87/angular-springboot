var reviews = [5, 7, 2, 4, 5.4, 2, 1];
for (var i = 0; i < reviews.length; i++) {
    console.log(reviews[i]);
}
var total = 0;
for (var i = 0; i < reviews.length; i++) {
    console.log("Each " + total);
    total += reviews[i];
}
var average = total / reviews.length;
console.log("The review average is: " + average);
