
const PLAYFIELD_ROWS = 20;
const PLAYFIELD_COLUMNS = 10;

const TETROMINO_NAMES = [
    "O",
    "L",
    "I",
    "T",
    "Z",
    "X",
    "D",
    "B"
];

const TETROMINOES = {
    "O": [
        [1, 1],
        [1, 1]
    ],
    "L": [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    "I": [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
    ],
    "T": [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    "Z": [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    "X": [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    "D": [
        [1]
    ],
    "B": [
        [1, 1],
        [0, 0]
    ]
}

let tetrisContainer = document.querySelector(".tetris");
let playfield;
let tetromino;
let randomName;

function generatePlayfield(rows, columns){
    for (let i = 0; i < rows * columns; i++){
        // console.log("div generate");
        const div = document.createElement("div");
        tetrisContainer.append(div);
    }
    playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(()=> new Array(PLAYFIELD_COLUMNS).fill(0))

    // console.log(playfield);
}

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

function getRandomTetromino(arr){
    const indexName = Math.floor(Math.random() * arr.length);
    randomName = arr[indexName];
    return randomName;
}

function generateTetromino(){
    const nameTetro = getRandomTetromino(TETROMINO_NAMES);
    console.log(nameTetro)
    const matrixTetro = TETROMINOES[nameTetro];

    const columnTetro = 4;
    const rowTetro = 0;
    
    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        row: rowTetro,
        column: columnTetro,
    }
}

generatePlayfield(PLAYFIELD_ROWS, PLAYFIELD_COLUMNS);
generateTetromino();

let cells = document.querySelectorAll(".tetris div");
console.log(cells);

function drawPlayField(){

    for(let row = 0; row < PLAYFIELD_ROWS; row++){
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }

}

function drawTetromino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for(let row = 0; row < tetrominoMatrixSize; row++){
        for(let column = 0; column < tetrominoMatrixSize; column++){
            if(tetromino.matrix[row][column] == 0){continue}
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);
        }
    }
}

drawTetromino();

function draw(){
    cells.forEach((cell) => cell.removeAttribute("class"));
    drawPlayField();
    drawTetromino();
}

document.addEventListener("keydown", onKeyDown);

function onKeyDown(event){
    switch(event.key){
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

function moveTetrominoDown(){
    tetromino.row += 1;
    if(isOutsideOfGameBoard()){
        tetromino.row -= 1;
        placeTetromino();
    }
}

function moveTetrominoLeft(){
    tetromino.column -= 1;
    if(isOutsideOfGameBoard()){
        tetromino.column += 1;
    }
}

function moveTetrominoRight(){
    tetromino.column += 1;
    if(isOutsideOfGameBoard()){
        tetromino.column -= 1;
    }
}

function isOutsideOfGameBoard(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(!tetromino.matrix[row][column]){continue}
            if(tetromino.column + column < 0 || 
                tetromino.column +column >= PLAYFIELD_COLUMNS ||
                tetromino.row + row >= PLAYFIELD_ROWS
                ){
                return true;
            }
        }
    }
    return false;
}

function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(!tetromino.matrix[row][column]) continue;

            playfield[tetromino.row + row][tetromino.column + column] = randomName;
        }
    }
    generateTetromino();
}