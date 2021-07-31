let reviews: number[] = [5, 7, 2, 4, 5.4, 2, 1];

for (let i = 0; i < reviews.length; i++) {
  console.log(reviews[i]);
}

let total: number = 0;
for (let i = 0; i < reviews.length; i++) {
  console.log("Each " + total);
  total += reviews[i];
}

let average: number = total / reviews.length;

console.log("The review average is: " + average);
