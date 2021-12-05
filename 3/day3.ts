import fs from "fs";

function parseInput(useExample?: boolean) {
  if (useExample)
    return fs.readFileSync("./dist/inputDay3Example.txt", "utf8").split("\n");
  return fs.readFileSync("./dist/inputDay3.txt", "utf8").split("\n");
}

function toDecimalNumber(binaryNumber: string) {
  return parseInt(binaryNumber, 2);
}

function problem1() {
  const diagnosticLines = parseInput();

  let gammaRate = "";

  for (let i = 0; i < diagnosticLines[0].length; i++) {
    const [numberOfZeros, numberOfOnes] = countOccurrences(diagnosticLines, i);
    numberOfZeros > numberOfOnes ? (gammaRate += "0") : (gammaRate += "1");
  }

  const epsilonRate = [...gammaRate]
    .map((n) => (n === "0" ? "1" : "0"))
    .join("");

  return toDecimalNumber(gammaRate) * toDecimalNumber(epsilonRate);
}

function countOccurrences(lines: string[], index: number): [number, number] {
  let numberOfOnes = 0;
  let numberOfZeros = 0;

  for (let line of lines) {
    line[index] === "0" ? numberOfZeros++ : numberOfOnes++;
  }

  return [numberOfZeros, numberOfOnes];
}

function oxygenStrategy(lines: string[], index: number): string {
  const [numberOfZeros, numberOfOnes] = countOccurrences(lines, index);

  return numberOfOnes >= numberOfZeros ? "1" : "0";
}

function co2ScrubberStrategy(lines: string[], index: number): string {
  const [numberOfZeros, numberOfOnes] = countOccurrences(lines, index);

  return numberOfZeros <= numberOfOnes ? "0" : "1";
}

function getRating(
  lines: string[],
  strategy: (lines: string[], index: number) => string
): number {
  for (let i = 0; i < lines[0].length; i++) {
    if (lines.length === 1) break;
    lines = lines.filter((l) => l[i] === strategy(lines, i));
  }

  return toDecimalNumber(lines[0]);
}

function problem2() {
  let diagnosticLines = parseInput();

  const oxigenGeneratorRating = getRating(diagnosticLines, oxygenStrategy);
  const co2ScrubberRating = getRating(diagnosticLines, co2ScrubberStrategy);

  return oxigenGeneratorRating * co2ScrubberRating;
}

export default {
  problem1,
  problem2,
};
