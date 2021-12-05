type BingoCell = {
  value: number;
  marked: boolean;
};

class BingoBoard {
  public board: BingoCell[][];

  constructor(initialBoard: number[][]) {
    this.board = [];

    for (let i = 0; i < initialBoard.length; i++) {
      for (let j = 0; j < initialBoard[i].length; j++) {
        if (!this.board[i]) this.board[i] = [];
        this.board[i].push({
          value: initialBoard[i][j],
          marked: false,
        });
      }
    }
  }

  public play(number: number): void {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j].value === number) {
          this.board[i][j].marked = true;
        }
      }
    }
  }

  public bingo(): boolean {
    if (this.checkRows() !== -1) return true;
    if (this.checkColumns() !== -1) return true;

    return false;
  }

  public unmarkedSum(): number {
    let sum = 0;

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (!this.board[i][j].marked) sum += this.board[i][j].value;
      }
    }

    return sum;
  }

  private checkRows(): number {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].filter((c) => !c.marked).length === 0) return i;
    }
    return -1;
  }

  private checkColumns(): number {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board.filter((r) => !r[i].marked).length === 0) return i;
      return -1;
    }
  }
}

export default BingoBoard;
