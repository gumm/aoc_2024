import * as B from 'badu'
import {
  allNegative,
  allPositive,
  arrToAbsMinMax,
  diffList,
  filterOnlyTrue,
  linesToArray,
  splitOnWhiteSpace,
  readInput,
  subSpecies,
  testBetween,
} from "../utils.js";

// Parse Input
const inputString = readInput('aoc_2_0.txt');
const inputArr = linesToArray(inputString).map(splitOnWhiteSpace(B.toInt));

// Task1: 282
const posPredicate = testBetween(1, 3);
const test1 = arr => ((allPositive(arr) || allNegative(arr)))
  ? posPredicate(arrToAbsMinMax(arr))
  : false;
console.log(filterOnlyTrue(inputArr.map(diffList).map(test1)).length);

// Task2: 349
const test2 = arr => test1(diffList(arr))
  || B.isArray(subSpecies(arr).find(e => test1(diffList(e))));
console.log(filterOnlyTrue(inputArr.map(test2)).length);
