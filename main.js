const PLATFIELD_COLUMNS = 10;
const PLATFIELD_ROWS = 20;

const TETROMINO_NAMES = ["O"];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
};

let playfield;
let tetromino;

function convertPositonToIndex(row, column) {
  return row * PLATFIELD_COLUMNS + column;
}

function generateplayfield() {
  for (let i = 0; i < PLATFIELD_ROWS * PLATFIELD_COLUMNS; i += 1) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
  playfield = new Array(PLATFIELD_ROWS)
    .fill()
    .map(() => new Array(PLATFIELD_COLUMNS).fill(0));
}

function generateTetromino() {
  const nameTetro = "O";
  const matrixTetro = TETROMINOES[nameTetro];
  const columnTetro = 5;
  const rowTetro = 3;

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: columnTetro,
    column: rowTetro,
  };
}

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      const cellIndex = convertPositonToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

function clearTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      const cellIndex = convertPositonToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.remove(name);
    }
  }
}

generateplayfield();
generateTetromino();
const cells = document.querySelectorAll(".tetris div");

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
  if (isOtsideOfGameBoard()) {
    tetromino.row += 1;
    placeTetromino();
  }
}

function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (isOtsideOfGameBoard()) {
    tetromino.column += 1;
  }
}

function moveTetrominoRight() {
  tetromino.column += 1;
  if (isOtsideOfGameBoard()) {
    tetromino.column -= 1;
  }
}

function isOtsideOfGameBoard() {
  const MatrixSize = tetromino.matrix.length;
  for (let row = 0; row < MatrixSize; row++) {
    for (let column = 0; column < MatrixSize; column++) {
      if (
        tetromino.column + column < 0 ||
        tetromino.column + column >= PLATFIELD_COLUMNS ||
        tetromino.row + row >= playfield.length
      ) {
        return true;
      }
    }
  }
  return false;
}

function placeTetromino() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;
      playfield[tetromino.row + row][tetromino.column + column] =
        TETROMINO_NAMES[0];
    }
  }
  generateTetromino();
}
