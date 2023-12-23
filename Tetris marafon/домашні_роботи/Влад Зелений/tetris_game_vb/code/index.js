// Імпорт змінних.
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, FIGURE_NAMES, FIGURES } from './constants.js';

// Імпорт допоміжних функцій.
import {
	convertPositionToIndex,
	isOutsideOfGameBoard,
	createFigure
} from './functions.js';

// Змінна елемету ігрового поля.
const root = document.querySelector('.root');

// Змінні стану гри.
let playfield;
let figure;

// Функція створення об'екта ігрового поля.
function createPlayField() {
	for (let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i++) {
		root.append(document.createElement('div'));
	}
	playfield = new Array(PLAYFIELD_ROWS).fill().map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

createPlayField();
figure = {...createFigure(FIGURE_NAMES, FIGURES,PLAYFIELD_COLUMNS)};
// Змінна клітинок ігрового поля.
const cells = document.querySelectorAll('.root div');

// Функція зміни кольру ігрового поля.
function drawPlayField() {
	for (let row = 0; row < PLAYFIELD_ROWS; row++) {
		for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
			const name = playfield[row][column];
			const cellIndex = convertPositionToIndex(row, column, PLAYFIELD_COLUMNS);
			cells[cellIndex].classList.add(name);
		}
	}
}

// Функція зміни кольру фігури.
function drawFigure() {
	const name = figure.name;
	const figureMatrixSize = figure.matrix.length;

	for (let row = 0; row < figureMatrixSize; row++) {
		for (let column = 0; column < figureMatrixSize; column++) {
			if (figure.matrix[row][column] == 0) {
				continue;
			}

			const cellIndex = convertPositionToIndex(figure.row + row, figure.column + column, PLAYFIELD_COLUMNS);
			cells[cellIndex].style.backgroundColor = figure.color;
		}
	}
}
drawFigure();

// Функція зміни стану поля та фігури.
function draw() {
	cells.forEach(cell => {
		cell.removeAttribute('class');
		cell.removeAttribute('style');
	});
	drawPlayField();
	drawFigure();
}

document.addEventListener('keydown', ev => {
	onKeyDown(ev.key);
});

document.getElementById('btns').addEventListener('click', ev => {
	ev.target.dataset.id ? onKeyDown(ev.target.dataset.id) : ev.preventDefault();
});

// Функція обробки події клавіатури та клік.
function onKeyDown(event) {
	switch (event) {
		case 'ArrowDown':
			moveFigureDown();
			break;
		case 'ArrowLeft':
			moveFigureLeft();
			break;
		case 'ArrowRight':
			moveFigureRight();
			break;
		case 'down':
			moveFigureDown();
			break;
		case 'left':
			moveFigureLeft();
			break;
		case 'right':
			moveFigureRight();
			break;
		default:
			break;
	}
	draw();
};

setInterval(() => {
	moveFigureDown();
	draw();
}, 1000);

// Функція рух фігури вниз.
function moveFigureDown() {
	figure.row += 1;
	if (isOutsideOfGameBoard(figure, playfield, PLAYFIELD_COLUMNS)) {
		figure.row -= 1;
		placeFigure();
	}
};

// Функція рух фігури ліворуч.
function moveFigureLeft() {
	figure.column -= 1;
	if (isOutsideOfGameBoard(figure, playfield, PLAYFIELD_COLUMNS)) {
		figure.column += 1;
	}
};

// Функція рух фігури праворуч.
function moveFigureRight() {
	figure.column += 1;
	if (isOutsideOfGameBoard(figure, playfield, PLAYFIELD_COLUMNS)) {
		figure.column -= 1;
	}
};

// Функція перевірки чи торкається фігура краю екрану.
function placeFigure() {
	const matrixSize = figure.matrix.length;
	for (let row = 0; row < matrixSize; row++) {
		for (let column = 0; column < matrixSize; column++) {
			if (!figure.matrix[row][column]) continue;

			playfield[figure.row + row][figure.column + column] = FIGURE_NAMES[0];
		}
	}
	figure = { ...createFigure(FIGURE_NAMES, FIGURES,PLAYFIELD_COLUMNS) };
};
