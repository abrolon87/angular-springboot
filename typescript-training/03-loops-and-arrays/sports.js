"use strict";
var sportsOne = ["Basketball", "Soccer", "Baseball", "Hockey"];
console.log("old school for loop");
for (var i = 0; i < sportsOne.length; i++) {
    console.log(sportsOne[i]);
}
// simplified for loop
console.log("simplified for loop");
for (var _i = 0, sportsOne_1 = sportsOne; _i < sportsOne_1.length; _i++) {
    var sport = sportsOne_1[_i];
    if (sport == "Basketball") {
        console.log("Let's go play " + sport);
    }
    else {
        console.log(sport);
    }
}
