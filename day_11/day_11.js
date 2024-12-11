import {lineToIntArr, readFile, sumArr} from "../utils.js";
import * as B from "badu";

const inputMap = lineToIntArr(readFile('aoc_11_0.txt'))
  .reduce((p, c) => p.set(c, (p.get(c) || 0) + 1), new Map());

// Helpers
const wrapSkip = e => ({n: e, d: false})
const wrap = e => ({n: e, d: true})
const unwrap = e => e.n;
const isDone = e => e.d;

// Rules
const rule1 = e => e === 0 ? wrap(1) : wrapSkip(e);
const rule2 = w => {
  if (isDone(w)) return w;
  let s = '' + unwrap(w);
  if (s.length % 2 !== 0) return w;
  const m = Math.floor(s.length / 2);
  return wrap([s.slice(0, m) | 0, s.slice(m, s.length) | 0]);
};
const rule3 = w => isDone(w) ? (unwrap(w).length ? unwrap(w) : [unwrap(w)]) : [unwrap(w) * 2024]
const blink = B.compose(rule3, rule2, rule1);

// Go for it.
const task1 = 25;
const task2 = 75;
const compute = (a, iter) => {
  for (let i = 0; i < iter; i++) {
    a = [...a.entries()].reduce((p, [k, v]) => {
      blink(k).forEach(e => p.set(e, (p.get(e) || 0) + v));
      return p;
    }, new Map());
  }
  return a;
}
const r1 = compute(inputMap, task1);
const r2 = compute(r1, task2 - task1);
console.log('Task1', sumArr(r1.values()));
console.log('Task2', sumArr(r2.values()));


