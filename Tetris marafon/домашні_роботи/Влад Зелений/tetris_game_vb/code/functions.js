
// Функція повертає випадковий елемент з масиву.
export function randomElement(arr) {
  return arr[Math.floor(Math.random() * (arr.length))]
}
// Функція повертає випадковий колір rgba.
export function randomColorRGDA(A=1) {
  return `rgba(${Math.floor(Math.random() * (256))},
   ${Math.floor(Math.random() * (256))}, 
   ${Math.floor(Math.random() * (256))}, 
   ${A})`
}
// Функція повертає індекс позиції елемента.
export function convertPositionToIndex(row, column, PLAYFIELD_COLUMNS) {
	return row * PLAYFIELD_COLUMNS + column;
}

// Функція перевірки чи торкається фігура краю екрану.
export function isOutsideOfGameBoard(figure, playfield, PLAYFIELD_COLUMNS) {
	const matrixSize = figure.matrix.length;
	for (let row = 0; row < matrixSize; row++) {
		for (let column = 0; column < matrixSize; column++) {
			if (!figure.matrix[row][column]) {
				continue;
			}
			if (
				figure.column + column < 0 ||
				figure.column + column >= PLAYFIELD_COLUMNS ||
				figure.row + row >= playfield.length
			) {
				return true;
			}
		}
	}
	return false;
}


// Функція створення об'екта фігури.
export function createFigure(FIGURE_NAMES, FIGURES,PLAYFIELD_COLUMNS) {
	const nameFigure = randomElement(FIGURE_NAMES);
	const matrixFigure = FIGURES[nameFigure];

	const rowFigure = 0;
	// const columnFigure = 4;
	const columnFigure = Math.floor((PLAYFIELD_COLUMNS-matrixFigure[0].length)/2);
	return {
		name: nameFigure,
		matrix: matrixFigure,
		row: rowFigure,
		column: columnFigure,
		color: randomColorRGDA()
	};
}