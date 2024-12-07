import {
  getInMatrix,
  readDirection,
  linesToArray,
  inspect,
  readInput,
  readMatrix,
  rotateMatrix,
  skewMatrixLeft,
  skewMatrixRight
} from "../utils.js";

// Parse Input
const matrix = linesToArray(readInput('aoc_4_0.txt')).map(e => e.split(''));
const readM = readMatrix(matrix);

// Task1: We rotate and skew the matrix and search for the elements in each
// of the rotated matrix. Once rotated, we can just as well have used grep
// on the output matrix. In fact, we have a utility
// function to print matrices to files.
let task1 = 0;
const XMAS = /XMAS/g;
const SAMX = /SAMX/g;

[matrix, rotateMatrix(matrix), rotateMatrix(skewMatrixRight(matrix)),
  rotateMatrix(skewMatrixLeft(matrix))].forEach((grid) => {
  grid.forEach(rowArray => {
    const row = rowArray.join('');
    task1 += (row.match(XMAS) || []).length;
    task1 += (row.match(SAMX) || []).length
  })
})
inspect(task1);


// Task2: 1858
let task2 = 0;
const readCoord = getInMatrix(matrix);
const masSam = ["MAS", "SAM"];

const searchMas = (ri, ci) => {
  const func = ([r, c]) => [ri + r, ci + c];
  const aC = [[-1, -1], [0, 0], [1, 1]].map(func);
  const bC = [[1, -1], [0, 0], [-1, 1]].map(func);
  const aShape = [readCoord(aC[0]), readCoord(aC[1]), readCoord(aC[2])].join('');
  const bShape = [readCoord(bC[0]), readCoord(bC[1]), readCoord(bC[2])].join('');
  if (masSam.includes(aShape) && masSam.includes(bShape)) {
    task2++;
  }
};

[matrix].forEach((arr) => {
  arr.forEach((s, ri) => {
    [...s].forEach((c, ci) => {
      if (c === "A") {
        searchMas(ri, ci)
      }
    });
  })
})

inspect(task2);


// Task1 Alt: 2454
let task1A = 0;
const searchFor = 'XMAS';
const searchLength = searchFor.length;
const matchSearch = e => e.join('') === searchFor;

const dirs = [
  readDirection('N'), readDirection('S'),
  readDirection('E'), readDirection('W'),
  readDirection('NW'), readDirection('NE'),
  readDirection('SW'), readDirection('SE')];

matrix.forEach((row, ri) => {
  row.forEach((char, ci) => {
    if (char === searchFor[0]) {
      task1A = task1A + dirs
        .map(f => f([ri, ci], searchLength))
        .map(readM)
        .filter(matchSearch).length;
    }
  })
});
inspect(task1A);
