// 1. Додати інші фігури
// 2. Стилізувати нові фігури на свій погляд
// 3. Додати функцію рандому котра буде видавати випадкову фігуру
// 4. Ценрування фігури коли вона з'являється
// 5. Додати функцію ранромних кольорів для кожної нової фігури

const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ['O', 'L', 'RL', 'J', 'S', 'Z', 'T'];
// console.table(TETROMINO_NAMES.length);
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
  RL: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  J: [
    [1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  S: [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
};

let playField;
let tetromino;

function randomGenerator(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

function centeredTetromino(PLAYFIELD_COLUMNS, lengthTetromino) {
  return Math.floor((PLAYFIELD_COLUMNS - lengthTetromino) / 2);
}

function randomColor() {
  const r = randomGenerator(0, 256);
  const g = randomGenerator(0, 256);
  const b = randomGenerator(0, 256);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

// function setRandomColorTetromino(elem) {
// const color = randomColor();
// elem.style.setProperty('--color-tetromino', color);
// }

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField() {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement('div');
    document.querySelector('.tetris').append(div);
  }

  playField = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
  // console.log(playField);
}

function randomTetromino() {
  // console.table(TETROMINO_NAMES);
  const ammount = TETROMINO_NAMES.length;
  const randomtetro = randomGenerator(0, ammount);
  return TETROMINO_NAMES[randomtetro];
}

function generateTetromino() {
  // const nameTetro = 'L';
  // console.log(randomGenerator(0, 7));
  const nameTetro = randomTetromino();
  // console.log(nameTetro);
  const matrixTetro = TETROMINOES[nameTetro];
  // console.table(matrixTetro);

  // const rowTetro = centeredTetromino(PLAYFIELD_COLUMNS, matrixTetro.length);
  const rowTetro = 3;
  const columnTetro = centeredTetromino(PLAYFIELD_COLUMNS, matrixTetro.length);;
  const colorTetro = randomColor();

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
    color: colorTetro,
  };
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.tetris div');
// console.log(tetromino.matrix, cells);

function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      // if(playfield[row][column] == 0) { continue };
      const name = playField[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetromino.name;
  const color = tetromino.color;
  // console.log(tetromino.matrix);
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.matrix[row][column] == 0) {
        continue;
      }

      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
      cells[cellIndex].style.setProperty('--color-tetromino', color);
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
  // console.table(playField);
}

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
  console.log(event);
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
        tetromino.row + row >= playField.length
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

      playField[tetromino.row + row][tetromino.column + column] =
        TETROMINO_NAMES[0];
      // tetromino.name;
    }
  }
  generateTetromino();
}
