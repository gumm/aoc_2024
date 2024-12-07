import {
  cardinalMap,
  getInMatrix,
  linesToArray,
  logIt,
  readInput,
  setInMatrix,
  sumArrays,
} from "../utils.js";
import {tryCatch} from "ramda";

// Parse Input
let task1 = 0; // 4973
let task2 = 0; // 1482
const matrix = linesToArray(readInput('aoc_6_0.txt')).map(e => e.split(''));
const getAtPos = getInMatrix(matrix);
const markPos = setInMatrix(matrix);

// Define starting conditions.
const path = new Set();
const cardinal = ["N", "E", "S", "W"];
let pointer = 0;
let heading = cardinalMap.get("N");

// Find the caret
const ri = matrix.findIndex((row, i) => row.includes('^'));
const ci = matrix[ri].indexOf('^')
let caret = [ri, ci];
const startingPos = caret;

// Change heading
const turn = () => {
  heading = cardinalMap.get(cardinal[(pointer += 1) % 4]);
}

// Move ahead
const move = () => {
  path.add(caret.join(','));
  const nextPos = sumArrays(caret, heading);
  const nextHurdle = getAtPos(nextPos);
  if (!nextHurdle) {
    return;
  }
  nextHurdle !== '#' ? (caret = nextPos) : turn()
  move()
}
move()
task1 = path.size;

// For each step in our path, add an obstacle, move, and if we blow up, we
// were in a loop.
([...path]).forEach(k => {
  const seenPos = k.split(',').map(Number);
  const matrixVal = getAtPos(seenPos);

  // Set the starting conditions.
  caret = startingPos;
  pointer = 0;
  heading = cardinalMap.get("N");

  // Mark our test position
  markPos(seenPos, "#");
  tryCatch(move, () => task2++)();

  // Reset the grid.
  markPos(seenPos, matrixVal);
})

logIt(task1);
logIt(task2);
