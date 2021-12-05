import fs from "fs";
import BingoBoard from "./BingoBoard";

type Input = {
  balls: number[];
  boards: BingoBoard[];
};

function problem1() {
  const input = parseInput();
  for (let ball of input.balls) {
    for (let board of input.boards) {
      board.play(ball);
      if (board.bingo()) {
        return board.unmarkedSum() * ball;
      }
    }
  }
}

function problem2() {
  const input = parseInput();

  let notCompletedBoards = input.boards;

  for (let ball of input.balls) {
    for (let board of notCompletedBoards) {
      board.play(ball);
      const isLastBoard = notCompletedBoards.length === 1;
      if (isLastBoard && board.bingo()) {
        return board.unmarkedSum() * ball;
      }
    }
    notCompletedBoards = notCompletedBoards.filter((b) => !b.bingo());
  }
}

function parseInput(useExample?: boolean): Input {
  const file = useExample
    ? "./dist/inputDay4Example.txt"
    : "./dist/inputDay4.txt";
  const inputString = fs.readFileSync(file, "utf8");

  return {
    balls: parseMovements(inputString),
    boards: parseBoards(inputString),
  };
}

function parseMovements(input: string) {
  return input
    .split("\n")[0]
    .split(",")
    .map((n) => parseInt(n));
}

function parseBoards(input: string) {
  const inputByLines = input.split("\n");
  const boards: BingoBoard[] = [];
  for (let i = 2; i < inputByLines.length; i += 6) {
    const board: number[][] = [];
    for (let j = i; j < i + 5; j++) {
      board.push(
        inputByLines[j]
          .split(" ")
          .filter((n) => n !== "")
          .map((n) => parseInt(n))
      );
    }

    boards.push(new BingoBoard(board));
  }

  return boards;
}

export default {
  problem1,
  problem2,
};
