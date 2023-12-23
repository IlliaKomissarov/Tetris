const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = [
    'O', 'L', 'J', 'S', 'Z', 'T', 'I'
];

const TETROMINOES = {
    'O': [
        [1, 1],
        [1, 1],
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'J': [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
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
    'T': [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    
}

const colorFigure = [
    "rgb(255, 0, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 0)",
    "rgb(255, 192, 203)",
    "rgb(255, 165, 0)",
    "rgb(128, 0, 128)",
    "rgb(128, 128, 128)",
    "rgb(165, 42, 42)",
    "rgb(255, 215, 0)",
    "rgb(192, 192, 192)",
    "rgb(128, 128, 0)",
    "rgb(128, 0, 0)",
    "rgb(0, 128, 0)",
    "rgb(0, 128, 128)",
    "rgb(0, 255, 127)",
]

let playfield;
let tetromino;

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField(){
    let i;
    for(i=0; i<PLAYFIELD_ROWS *PLAYFIELD_COLUMNS; i++) {
        let div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }
    playfield = new Array(PLAYFIELD_ROWS).fill().map(() => new Array(PLAYFIELD_COLUMNS).fill());

}

function generateTetromino(){
    const name =  TETROMINO_NAMES[Math.floor(Math.random() * TETROMINO_NAMES.length)];
    const matrix = TETROMINOES[name];

    const column = Math.floor((PLAYFIELD_COLUMNS - TETROMINOES[name].length) /2);
    const row = 2;

    const color = colorFigure[Math.floor(Math.random() * colorFigure.length)]
    
    tetromino = {
        name: name,
        matrix: matrix,
        row: row,
        column: column,
        color: color
    }
}

generatePlayField();
generateTetromino();

const cells = document.querySelectorAll('.tetris div');
// console.log(cells);

function drawPlayField(){
    
    for(let row=0; row<PLAYFIELD_ROWS; row++){
        for(let column=0; column<PLAYFIELD_COLUMNS; column++){        
            const name = playfield[row][column]; 
            const cellIndex = convertPositionToIndex(row, column);
            if (name) {
                cells[cellIndex].classList.add(name); 
            }
            else {
                cells[cellIndex].style.removeProperty('background');
            }
        }
    }

}

function drawTetromino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;
   
    
    for(let row=0; row<tetrominoMatrixSize; row++){
        for(let column=0; column<tetrominoMatrixSize; column++){

            if(!tetromino.matrix[row][column]) continue;
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);
            cells[cellIndex].style.background = tetromino.color;
        }
    }
}

drawTetromino();

function draw(){
    cells.forEach(function(cell){ cell.removeAttribute('class')});
    drawPlayField();
    drawTetromino(); 

}

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event){
    // console.log(event);
    switch(event.key){
        case 'ArrowRight':
            moveTetrominoRight();
            break;
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
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
    for(let row=0; row<matrixSize; row++){
        for(let column=0; column<matrixSize; column++){
            if(!tetromino.matrix[row][column]) continue;

            if((tetromino.column + column < 0) || 
            (tetromino.column + column >= PLAYFIELD_COLUMNS) || 
            (tetromino.row + row >= playfield.length)) {
                return true;
            } 
        } 
    }
}

function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row=0; row<matrixSize; row++){
        for(let column=0; column<matrixSize; column++){
            if(!tetromino.matrix[row][column]) continue;

            playfield[tetromino.row + row][tetromino.column + column] = TETROMINO_NAMES['0'];

        }
    }
    generateTetromino();
}