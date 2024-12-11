import {inspect, lineToIntArr, readFile, sumArr} from "../utils.js";
import * as B from "badu";

const inputMap = lineToIntArr(readFile('aoc_11_0.txt'))
  .reduce((p, c) => p.set(c, (p.get(c) || 0) + 1), new Map());

const wrapSkip = e => ({n: e, d: false})
const wrap = e => ({n: e, d: true})
const unwrap = e => e.n;
const isDone = e => e.d;
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

let a = inputMap;
for (let i = 0; i < 75; i++) {
  a = [...a.entries()].reduce((p, [k, v]) => {
    blink(k).forEach(e => {
      const multiplier = p.get(e) || 0;
      p.set(e, multiplier + v);
    });
    return p;
  }, new Map());
}

inspect(sumArr(a.values()));
