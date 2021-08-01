import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

let myShape = new Shape(5, 10);
let myCircle = new Circle(10, 15, 20);
let myRectangle = new Rectangle(0, 0, 21, 42);
console.log("my shape info: " + myShape.getInfo());
console.log("my circle info: " + myCircle.getInfo());
console.log("my rectangle info: " + myRectangle.getInfo());
