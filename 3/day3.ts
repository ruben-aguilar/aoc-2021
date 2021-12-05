import fs from "fs";

function parseInput(useExample?: boolean) {
  if (useExample)
    return fs.readFileSync("./dist/inputDay3Example.txt", "utf8").split("\n");
  return fs.readFileSync("./dist/inputDay3.txt", "utf8").split("\n");
}

function toDecimalNumber(binaryNumber: string) {
  let result = 0;
  const reversed = [...binaryNumber].reverse();
  for (let i = 0; i < reversed.length; i++) {
    result += parseInt(reversed[i]) * Math.pow(2, i);
  }

  return result;
}

function problem1() {
  const diagnosticLines = parseInput();

  let gammaRate = "";

  for (let i = 0; i < diagnosticLines[0].length; i++) {
    let numberOfZeros = 0;
    let numberOfOnes = 0;
    for (let row of diagnosticLines) {
      row[i] === "0" ? numberOfZeros++ : numberOfOnes++;
    }
    numberOfZeros > numberOfOnes ? (gammaRate += "0") : (gammaRate += "1");
  }

  const epsilonRate = [...gammaRate]
    .map((n) => (n === "0" ? "1" : "0"))
    .join("");

  return toDecimalNumber(gammaRate) * toDecimalNumber(epsilonRate);
}

function problem2() {
  return 0;
}

export default {
  problem1,
  problem2,
};
