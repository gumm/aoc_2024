import {inspect, readFile, splitNL, sumArr} from "../utils.js";

// Parse Input
const inputStrings = splitNL(readFile('aoc_13_0.txt'))
const parseButtonInput = s => {
  return s.split(',').map(e => e.trim().split('+')[1]).map(Number);
};
const parseTotal = s => {
  return s.split(',').map(e => e.trim().split('=')[1]).map(Number);
};

// Task 1
// const offset = 0;

// Task 2
const offset = 10000000000000;

const gameMap = inputStrings.reduce((p, c, i) => {
  const id = (i - i % 4) / 4;
  const item = p.get(id) || {};
  const [p1, p2] = c.split(':');
  let x, y;
  if (p1.endsWith("A")) {
    [x, y] = parseButtonInput(p2)
    item.BUT_A = {x, y};
  } else if (p1.endsWith("B")) {
    [x, y] = parseButtonInput(p2)
    item.BUT_B = {x, y};
  } else if (p1.endsWith("e")) {
    [x, y] = parseTotal(p2)
    item.TARGET = {x: x + offset, y: y + offset};
  }
  p.set(id, item);
  return p;
}, new Map());

// Find the intersection of 2 lines in the standard format: ax + by = c
// We are only interested in whole number solutions.
const findIntersection = (a1, b1, c1, a2, b2, c2) => {
  const determinant = a1 * b2 - a2 * b1;
  if (Math.abs(determinant) < Number.EPSILON) {
    return null;
  }
  const x = (b2 * c1 - b1 * c2) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;
  
  if (x >= 0 && x % 1 === 0 && y >=0 && y % 1 === 0) {
      return [x, y];
  }
  return [0,0];
}

let total = 0;
[...gameMap.entries()].forEach(([k,{BUT_A, BUT_B, TARGET}]) => {
  const intersect = findIntersection(BUT_A.x, BUT_B.x, TARGET.x, BUT_A.y, BUT_B.y, TARGET.y);
  const costs = intersect[0] * 3 + intersect[1];
  total += costs;
})

inspect(total);
