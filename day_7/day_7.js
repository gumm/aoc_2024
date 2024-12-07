import {linesToArray, inspect, readInput, makeCombos,} from "../utils.js";

// Parse Input
let task1 = 0;
let task2 = 0;
const lists = linesToArray(readInput('aoc_7_0.txt'));

// Operations
const add = (a, b) => a + b;
const mul = (a, b) => a * b;
const cat = (a, b) => Number(`${a}${b}`);

const calc = operations => {
  let total = 0;
  const comboMap = new Map();
  lists.forEach(eq => {
    const [res, ips] = eq.split(':');
    const target = Number(res);
    const input = ips.trim().split(' ').map(Number);
    const slots = input.length - 1;

    // Memoize already computed combos
    let combos = [];
    if (comboMap.has(slots)) {
      combos = comboMap.get(slots)
    } else {
      combos = makeCombos(slots, operations);
      comboMap.set(slots, combos);
    }

    const found = combos.find(combo => {
      return input.reduce((p, c, i) => {
        if (i === 0) {
          return c;
        }
        return combo[i - 1](p, c)
      }, undefined) === target;
    });
    total = found ? total + target : total;
  })
  return total;
}

task1 = calc([add, mul]);
inspect(task1); // 465126289353

task2 = calc([add, mul, cat])
inspect(task2); // 70597497486371
