import {inspect, readFile, sigma} from "../utils.js";
import * as B from "badu";
import {pairs} from "badu";

const input = readFile('aoc_9_0.txt').split('').map(B.toInt);
const files = pairs(input);

const spanScore = (score, start, span) => score * (start * span + sigma(span - 1));

const [usedMap, freeMap, idx] = files.reduce(([uM, fM, idx], [size, free], i) => {
  uM.set(i, {idx: idx, size: size, i: i})
  fM.set(i, {i: i, idx: idx + size, size: free || 0})
  return [uM, fM, idx + size + free];
}, [new Map(), new Map(), 0]);

// Task1: Got lost in the struggle...

// Task2: 6265268809555
for (let k = usedMap.size - 1; k > 0; k--) {
  const u = usedMap.get(k);
  const n = [...freeMap.values()].findIndex(e => u.i > e.i && e.size >= u.size);
  if (n >= 0) {
    const f = freeMap.get(n);
    u.idx = f.idx;
    f.size = f.size - u.size;
    f.idx = f.idx + u.size;
    usedMap.set(k, u);
    freeMap.set(n, f);
  }
}

const total = [...usedMap.values()].reduce((p, c) => p + spanScore(c.i, c.idx, c.size), 0);
inspect(total)
