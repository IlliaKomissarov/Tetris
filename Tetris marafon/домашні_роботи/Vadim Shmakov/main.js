// додати інші фігури
// стилізувати
// додати функцію рандому котра буде видавати випадкову фігуру
// центрування фігури коли вона з'являється
// додати функцію рандомних кольорів для кожної нової фігури

const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = [
    'O',
    'I',
    'S',
    'Z',
    'L',
    'J',
    'T'
];

const TETROMINOES = {
    'O': [
        [1, 1],
        [1, 1]
    ],
    'I': [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    'S': [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    'Z': [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    'L': [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
    ],
    'J': [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1],
    ],
    'T': [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
};

let playfield;
let tetromino;

function generateRandomTetromino() {
    let randomTetromino = Array.from(TETROMINO_NAMES);

    return randomTetromino[Math.floor(Math.random() * randomTetromino.length)];
}

function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayfield() {
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));

}

function generateRandomColor() {
    let colors = ['yellow', 'green', 'red', 'orange', 'turquoise', 'brown', 'purple'];

    return colors[Math.floor(Math.random() * colors.length)];
}

function generateTetromino() {
    const nameTetro = generateRandomTetromino(TETROMINO_NAMES);
    const matrixTetro = TETROMINOES[nameTetro];
    const colorTetro = generateRandomColor();

    const columnTetro = Math.round(Number((PLAYFIELD_COLUMNS - matrixTetro.length)/2));
    const rowTetro = 0;

    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        row: rowTetro,
        column: columnTetro,
        color: colorTetro,
    }
}

generatePlayfield();
generateTetromino();

const cells = document.querySelectorAll('.tetris div');

function drawPlayField() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {

            if (playfield[row][column] == 0) { continue; };

            const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}



function drawTetromino() {
    const name = tetromino.color;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (tetromino.matrix[row][column] == 0) { continue };

            const cellIndex = convertPositionToIndex(tetromino.row + row,
                tetromino.column + column);

            cells[cellIndex].classList.add(name);
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

document.addEventListener('keydown', onKeyDown);

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
            if (!tetromino.matrix[row][column]) { continue; }
            if (tetromino.column + column < 0 ||
                tetromino.column + column >= PLAYFIELD_COLUMNS ||
                tetromino.row + row >= playfield.length) {
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

            playfield[tetromino.row + row][tetromino.column + column] = tetromino.color;
        }

    }
    generateTetromino();
}