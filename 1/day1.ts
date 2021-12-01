import fs from "fs";

const measurements = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((m) => parseInt(m));

let counter = 0;

for (let i = 1; i < measurements.length; i++) {
  if (measurements[i] > measurements[i - 1]) {
    counter++;
  }
}

console.log(counter);
