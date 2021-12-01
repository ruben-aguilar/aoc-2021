import fs from "fs";

function parseInput() {
  return fs
    .readFileSync("./dist/input.txt", "utf8")
    .split("\n")
    .map((m) => parseInt(m));
}

function problem1() {
  const measurements = parseInput();

  let counter = 0;
  for (let i = 1; i < measurements.length; i++) {
    if (measurements[i] > measurements[i - 1]) {
      counter++;
    }
  }

  return counter;
}

function problem2() {
  const measurements = parseInput();

  let counter = -1;
  let previousCount = 0;

  for (let i = 0; i < measurements.length - 2; i++) {
    const currentCount =
      measurements[i] + measurements[i + 1] + measurements[i + 2];
    if (currentCount > previousCount) counter++;
    previousCount = currentCount;
  }

  return counter;
}

export default {
  problem1,
  problem2,
};
