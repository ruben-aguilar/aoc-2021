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

function findMostCommon(lines: string[], index: number): string {
  let numberOfOnes = 0;
  let numberOfZeros = 0;

  for (let row of lines) {
    row[index] === "0" ? numberOfZeros++ : numberOfOnes++;
  }

  return numberOfOnes >= numberOfZeros ? "1" : "0";
}

function findLessCommon(lines: string[], index: number): string {
  let numberOfOnes = 0;
  let numberOfZeros = 0;

  for (let row of lines) {
    row[index] === "0" ? numberOfZeros++ : numberOfOnes++;
  }

  return numberOfZeros <= numberOfOnes ? "0" : "1";
}

function getOxygenGeneratorRating(diagnosticLines: string[]) {
  for (let i = 0; i < diagnosticLines[0].length; i++) {
    if (diagnosticLines.length === 1) break;
    diagnosticLines = diagnosticLines.filter(
      (l) => l[i] === findMostCommon(diagnosticLines, i)
    );
  }

  return toDecimalNumber(diagnosticLines[0]);
}

function getCo2ScrubberRating(diagnosticLines: string[]) {
  for (let i = 0; i < diagnosticLines[0].length; i++) {
    if (diagnosticLines.length === 1) break;
    diagnosticLines = diagnosticLines.filter(
      (l) => l[i] === findLessCommon(diagnosticLines, i)
    );
  }

  return toDecimalNumber(diagnosticLines[0]);
}

function problem2() {
  let diagnosticLines = parseInput();

  const oxigenGeneratorRating = getOxygenGeneratorRating(diagnosticLines);
  const co2ScrubberRating = getCo2ScrubberRating(diagnosticLines);

  console.log(oxigenGeneratorRating);
  console.log(co2ScrubberRating);

  return oxigenGeneratorRating * co2ScrubberRating;
}

export default {
  problem1,
  problem2,
};
