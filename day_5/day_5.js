import {linesToArray, logIt, readInput} from "../utils.js";
import * as B from "badu";

// Parse Input
let task1 = 0; // 4185
let task2 = 0; // 4480
const rules = linesToArray(readInput('order.txt')).map(e => e.split('|').map(B.toInt));
const pages = linesToArray(readInput('aoc_5_0.txt')).map(e => e.split(',').map(B.toInt));

// Build a map of rules.
const ruleMap = new Map();
rules.forEach((row, ri) => {
  ruleMap.set(row[0], new Set([...ruleMap.get(row[0]) || [], row[1]]));
})


pages.forEach(page => {
  const pName = page.join('');
  const sorted = [];
  const ti = Math.floor(page.length / 2);

  // Consume from the front, and if it is out of order, put it back at the back.
  while (page.length > 0) {
    const now = page.shift();
    const p1 = ruleMap.get(now);
    const p2 = new Set(page);
    [...p1].filter(e => p2.has(e)).length ? page.push(now) : sorted.unshift(now)
  }

  const midVal = sorted[ti];
  pName === sorted.join('') ? task1 += midVal : task2 += midVal;
})

logIt(task1);
logIt(task2);
