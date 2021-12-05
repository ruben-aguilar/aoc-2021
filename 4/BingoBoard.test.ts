import BingoBoard from "./BingoBoard";

describe("BingoBoard should", () => {
  const initialBoard = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ];
  it("win with a row", () => {
    const play = [1, 2, 3, 4, 5];

    const board = new BingoBoard(initialBoard);
    for (let ball of play) {
      board.play(ball);
    }

    expect(board.bingo()).toBeTruthy();
  });

  it("win with a column", () => {
    const play = [1, 6, 11, 16, 21];

    const board = new BingoBoard(initialBoard);
    for (let ball of play) {
      board.play(ball);
    }

    expect(board.bingo()).toBeTruthy();
  });

  it("not win if there are no lines or columns", () => {
    const play = [1, 2, 3, 4, 7];

    const board = new BingoBoard(initialBoard);
    for (let ball of play) {
      board.play(ball);
    }

    expect(board.bingo()).toBeFalsy();
  });

  it("provide the sum of all unmarked numbers", () => {
    const play = [1, 2, 3, 4, 5];

    const board = new BingoBoard(initialBoard);
    for (let ball of play) {
      board.play(ball);
    }

    expect(board.unmarkedSum()).toBe(310);
  });
});
