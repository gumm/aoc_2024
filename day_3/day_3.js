import {linesToArray, logIt, readInput,} from "../utils.js";

const mul = s => s.replace("mul(", '').replace(")", '')
  .split(',').reduce((a, b) => a * parseInt(b), 1);

const parse = ([acc, on], c) => {
  if (c === "do()" || c === "don't()") {
    return [acc, c === "do()"];
  }
  return on ? [mul(c) + acc, on] : [acc, on];
}

// Task11: 185797128
// grep -oP "mul\([0-9]+,[0-9]+\)" aoc_3_0.txt > d3_1.txt
const t1Input = readInput('d3_1.txt');
const [t1Result, _] = linesToArray(t1Input).reduce(parse, [0, true]);
logIt(t1Result);

// Task2: 89798695
// grep -oP "(don't\(\)|do\(\)|mul\([0-9]+,[0-9]+\))" aoc_3_0.txt > d3_2.txt
const t2Input = readInput('d3_2.txt');
const [t2Result, __] = linesToArray(t2Input).reduce(parse, [0, 1])
logIt(t2Result);
