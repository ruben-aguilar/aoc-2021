import fs from "fs";
type Direction = "forward" | "down" | "up";

type Command = {
  direction: Direction;
  distance: number;
};

type Position = {
  horizontalPosition: number;
  depth: number;
};

function parseInput(): Command[] {
  function parseInstruction(rawInstruction: string): Command {
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

  public exec = (command: Command) => {
    switch (command.direction) {
      case "forward":
        this.position.horizontalPosition += command.distance;
        break;
      case "down":
        this.position.depth += command.distance;
        break;
      case "up":
        this.position.depth -= command.distance;
    }
  };

  public getCurrentPosition(): Position {
    return { ...this.position };
  }
}

class SubmarineV2 extends Submarine {
  protected aim = 0;

  public exec = (command: Command) => {
    switch (command.direction) {
      case "forward":
        this.position.horizontalPosition += command.distance;
        this.position.depth += command.distance * this.aim;
        break;
      case "down":
        this.aim += command.distance;
        break;
      case "up":
        this.aim -= command.distance;
    }
  };
}

function problem1() {
  const commands = parseInput();
  const submarine = new Submarine();

  commands.forEach(submarine.exec);

  const finalPosition = submarine.getCurrentPosition();
  return finalPosition.horizontalPosition * finalPosition.depth;
}

function problem2() {
  const commands = parseInput();
  const submarine = new SubmarineV2();

  commands.forEach(submarine.exec);

  const finalPosition = submarine.getCurrentPosition();
  return finalPosition.horizontalPosition * finalPosition.depth;
}

export default {
  problem1,
  problem2,
};
