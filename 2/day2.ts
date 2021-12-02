import fs from "fs";
type Direction = "forward" | "down" | "up";

type Instruction = {
  direction: Direction;
  distance: number;
};

type Position = {
  horizontalPosition: number;
  depth: number;
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
class Submarine {
  protected position = {
    horizontalPosition: 0,
    depth: 0,
  };

  public exec = (instruction: Instruction) => {
    switch (instruction.direction) {
      case "forward":
        this.position.horizontalPosition += instruction.distance;
        break;
      case "down":
        this.position.depth += instruction.distance;
        break;
      case "up":
        this.position.depth -= instruction.distance;
    }
  };

  public currentPosition(): Position {
    return { ...this.position };
  }
}

class SubmarineV2 extends Submarine {
  protected aim = 0;

  public exec = (instruction: Instruction) => {
    switch (instruction.direction) {
      case "forward":
        this.position.horizontalPosition += instruction.distance;
        this.position.depth += instruction.distance * this.aim;
        break;
      case "down":
        this.aim += instruction.distance;
        break;
      case "up":
        this.aim -= instruction.distance;
    }
  };
}

function problem1() {
  const instructions = parseInput();
  const submarine = new Submarine();

  instructions.forEach(submarine.exec);

  const finalPosition = submarine.currentPosition();
  return finalPosition.horizontalPosition * finalPosition.depth;
}

function problem2() {
  const instructions = parseInput();
  const submarine = new SubmarineV2();

  instructions.forEach(submarine.exec);

  const finalPosition = submarine.currentPosition();
  return finalPosition.horizontalPosition * finalPosition.depth;
}

export default {
  problem1,
  problem2,
};
