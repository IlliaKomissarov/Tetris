const PLAYFIELD_COLUMNS = 10;
const PLAYFIELDS_ROWS = 20;

const TETROMINO_NAMES = ["O"];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
};

let playfield;
let tetromino;

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayfield() {
  for (let i = 0; i < PLAYFIELDS_ROWS * PLAYFIELD_COLUMNS; i += 1) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
  playfield = new Array(PLAYFIELDS_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
  console.log(playfield);
}

function generateTetromino() {
  const nameTetro = "O";
  const matrixTetro = TETROMINOES[nameTetro];
  const columnTetro = 4;
  const rowTetro = 3;

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    column: columnTetro,
    row: rowTetro,
  };
}

generatePlayfield();
generateTetromino();
const cells = document.querySelectorAll(".tetris div");

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

drawTetromino();

function draw() {
  cells.forEach(function (cell) {
    cell.removeAttribute("class");
  });
  drawTetromino();
}

document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowDown":
      moveTetrominoDown();
      break;
    case "ArrowLeft":
      moveTetrominoLeft();
      break;
    case "ArrowRight":
      moveTetrominoRight();
      break;
  }
  draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
  if (isOutsideOfGameBoard()) {
    tetromino.row -= 1;
  }
}

function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (isOutsideOfGameBoard()) {
    tetromino.column += 1;
  }
}
function moveTetrominoRight() {
  tetromino.column += 1;
  if (isOutsideOfGameBoard()) {
    tetromino.column -= 1;
  }
}

function isOutsideOfGameBoard() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row += 1) {
    for (let column = 0; column < matrixSize; column++) {
      if (
        tetromino.column + column < 0 ||
        tetromino.column + column >= PLAYFIELD_COLUMNS ||
        tetromino.row + row >= playfield.length
      ) {
        return true;
      }
    }
  }
  return false;
}
