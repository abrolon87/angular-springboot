let sportsOne: string[] = ["Basketball", "Soccer", "Baseball", "Hockey"];

console.log("old school for loop");
for (let i = 0; i < sportsOne.length; i++) {
  console.log(sportsOne[i]);
}

// simplified for loop
console.log("simplified for loop");
for (let sport of sportsOne) {
  if (sport == "Basketball") {
    console.log("Let's go play " + sport);
  } else {
    console.log(sport);
  }
}
