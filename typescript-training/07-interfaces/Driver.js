"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CricketCoach_1 = require("./CricketCoach");
var GolfCoach_1 = require("./GolfCoach");
var cricketCoach = new CricketCoach_1.CricketCoach();
var golfCoach = new GolfCoach_1.GolfCoach();
var coaches = [];
coaches.push(cricketCoach);
coaches.push(golfCoach);
for (var _i = 0, coaches_1 = coaches; _i < coaches_1.length; _i++) {
    var coach = coaches_1[_i];
    console.log(coach.getDailyWorkout());
}
