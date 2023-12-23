// 1. Додати інші фігури done
// 2. Стилізувати нові фігури на свій погляд done
// 3. Додати функцію рандому котра буде видавати випадкову фігуру done
// 4. Ценрування фігури коли вона з'являється
// 5. Додати функцію ранромних кольорів для кожної нової фігури done

const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ['O', 'L', 'J', 'S', 'Z', 'T', 'I'];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  I: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
};

let playfield;
let tetromino;
const tetrominoColors = ['red', 'green', 'blue', 'yellow', 'violet', 'aqua', 'orange'];

function getRandomTetromino() {
  const randomIndex = Math.floor(Math.random() * TETROMINO_NAMES.length);
  return TETROMINO_NAMES[randomIndex];
}

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayfield() {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement('div');
    document.querySelector('.tetris').append(div);
  }

  playfield = new Array(PLAYFIELD_ROWS).fill().map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

function getRandomStyleTetromino() {
  const randomColorIndex = Math.floor(Math.random() * tetrominoColors.length);

  return tetrominoColors[randomColorIndex];
}

function generateTetromino() {
  const nameTetro = getRandomTetromino();
  const matrixTetro = TETROMINOES[nameTetro];

  const rowTetro = 3;
  const columnTetro = 4;

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
    color: getRandomStyleTetromino(),
  };
}

generatePlayfield();
generateTetromino();
const cells = document.querySelectorAll('.tetris div');

function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      const name = playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.matrix[row][column] === 0) {
        continue;
      }

      const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
      cells[cellIndex].classList.add(tetromino.color);
    }
  }
}

drawTetromino();

function draw() {
  cells.forEach(function (cell) {
    cell.removeAttribute('class');
  });
  drawPlayField();
  drawTetromino();
}

function isOutsideOfGameBoard() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) {
        continue;
      }
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

function placeTetromino() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;

      playfield[tetromino.row + row][tetromino.column + column] = TETROMINO_NAMES[0];
    }
  }
  generateTetromino();
}

function moveTetrominoDown() {
  tetromino.row += 1;
  if (isOutsideOfGameBoard()) {
    tetromino.row -= 1;
    placeTetromino();
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

function onKeyDown(event) {
  switch (event.key) {
    case 'ArrowDown':
      moveTetrominoDown();
      break;
    case 'ArrowLeft':
      moveTetrominoLeft();
      break;
    case 'ArrowRight':
      moveTetrominoRight();
      break;
  }
  draw();
}

document.addEventListener('keydown', onKeyDown);
