import * as B from 'badu'
import {
  splitNL,
  mapWithCounts,
  readFile,
  sortNumeric,
  splitOnWhiteSpace,
  sumArr,
} from "../utils.js";

// Parse Input
const inputString = readFile('aoc_1_0.txt');
const arr = splitNL(inputString).map(splitOnWhiteSpace(B.toInt));

// Task1: 1666427
const cols = B.columnAt(arr);
const a = cols(0).toSorted(sortNumeric);
const b = cols(1).toSorted(sortNumeric);
const zipped = B.zip(a, b).map(e => Math.abs(e[0] - e[1]));
console.log(sumArr(zipped));

// Task2: 24316233
const mapToCount = mapWithCounts(b);
const multiplied = a.map(e => (mapToCount.get(e) || 0) * e);
console.log(sumArr(multiplied));
