import {linesToArray, logIt, readInput,} from "../utils.js";

// Parse Input
let task1 = 0; // 465126289353
let task2 = 0; // 70597497486371
const lists = linesToArray(readInput('aoc_7_0.txt'));

// Operations
const add = (a, b) => a + b;
const mul = (a, b) => a * b;
const cat = (a, b) => Number(`${a}${b}`);

// How many ways can I arrange m candidates in an arrangement of n slots?
const makeCombos = (nSlots, candidates) => {
  const func = (combo) => {
    if (combo.length === nSlots) {
      return [combo];
    }
    const combos = [];
    for (let op of candidates) {
      const nextCombo = [...combo, op];
      combos.push(...func(nextCombo));
    }
    return combos;
  }
  return func([]);
}

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

    const foundAt = combos.findIndex(combo => {
      return input.reduce((p, c, i) => {
        if (i === 0) {
          return c;
        }
        return combo[i - 1](p, c)
      }, undefined) === target;
    });
    if (foundAt >= 0) {
      total += target;
    }
  })
  return total;
}

task1 = calc([add, mul]);
logIt(task1);

task2 = calc([add, mul, cat])
logIt(task2);
