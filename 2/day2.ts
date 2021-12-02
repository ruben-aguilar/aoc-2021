import fs from "fs";
type Direction = "forward" | "down" | "up";

type Instruction = {
  direction: Direction;
  distance: number;
};

type Coords = {
  x: number;
  y: number;
};

function parseInput(): Instruction[] {
  function parseInstruction(rawInstruction: string): Instruction {
    return {
      direction: rawInstruction.split(" ")[0] as Direction,
      distance: parseInt(rawInstruction.split(" ")[1]),
    };
  }

  return fs
    .readFileSync("./dist/inputDay2.txt", "utf8")
    .split("\n")
    .map(parseInstruction);
}

function problem1() {
  const instructions = parseInput();

  const coords = {
    horizontalPosition: 0,
    depth: 0,
  };

  for (let instruction of instructions) {
    switch (instruction.direction) {
      case "forward":
        coords.horizontalPosition += instruction.distance;
        break;
      case "down":
        coords.depth += instruction.distance;
        break;
      case "up":
        coords.depth -= instruction.distance;
    }
  }

  return coords.horizontalPosition * coords.depth;
}

function problem2() {
  const instructions = parseInput();

  const coords = {
    horizontalPosition: 0,
    depth: 0,
  };
  let aim = 0;

  for (let instruction of instructions) {
    switch (instruction.direction) {
      case "forward":
        coords.horizontalPosition += instruction.distance;
        coords.depth += instruction.distance * aim;
        break;
      case "down":
        aim += instruction.distance;
        break;
      case "up":
        aim -= instruction.distance;
    }
  }

  return coords.horizontalPosition * coords.depth;
}

export default {
  problem1,
  problem2,
};
