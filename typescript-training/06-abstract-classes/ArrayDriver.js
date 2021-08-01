"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var myCircle = new Circle_1.Circle(10, 15, 20);
var myRectangle = new Rectangle_1.Rectangle(0, 0, 21, 42);
// console.log("my shape info: " + myShape.getInfo());
// console.log("my circle info: " + myCircle.getInfo());
// console.log("my rectangle info: " + myRectangle.getInfo());
var allShapes = [];
allShapes.push(myCircle);
allShapes.push(myRectangle);
for (var _i = 0, allShapes_1 = allShapes; _i < allShapes_1.length; _i++) {
    var shape = allShapes_1[_i];
    console.log("Dimensions of shape: " + shape.getInfo());
    console.log(shape.calculateArea());
    console.log();
}
