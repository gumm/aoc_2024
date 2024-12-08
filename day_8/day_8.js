import {
  diffArrays,
  inspect,
  isInMatrix,
  linesToArray,
  readInput,
  reverseHeading,
  sumArrays,
} from "../utils.js";

// Parse Input
const t1Set = new Set()
const t2Set = new Set()
const matrix = linesToArray(readInput('aoc_8_0.txt'))
  .map(e => e.split(''));
const inBox = isInMatrix(matrix);

// Get a list of unique elements in the matrix.
const unq = [...new Set(matrix.reduce((p, c) => {
  return [...p, ...(new Set(c))]
}, []))].filter(e => e !== '.')

// Create a map of where in the matrix each of the types are.
const map = new Map();
for (let e of unq) {
  const p = [];
  matrix.forEach((row, ri) => {
    row.forEach((c, ci) => {
      if (c === e) {
        p.push([ri, ci])
      }
    })
  })
  map.set(e, p);
}

// Walk through the map, and for each antenna, compute its nulls.
for (const [_, v] of map) {
  while (v.length > 1) {
    const a1 = v.shift();
    v.forEach(a2 => {
      const heading1 = diffArrays(a1, a2);
      const heading2 = reverseHeading(heading1);
      let p1 = sumArrays(a1, heading1);
      let p2 = sumArrays(a2, heading2);

      // Task1:
      [p1, p2].filter(inBox).forEach(p => t1Set.add(p.join()))

      // Task2:
      // Each antenna in the pair clobbers the other.
      t2Set.add(a2.join());
      t2Set.add(a1.join());

      // Loop through all the nulls in both directions
      while (inBox(p1)) {
        t2Set.add(p1.join());
        p1 = sumArrays(p1, heading1);
      }
      while (inBox(p2)) {
        t2Set.add(p2.join());
        p2 = sumArrays(p2, heading2);
      }

    })
  }
}

inspect(t1Set.size);  // 323
inspect(t2Set.size);  // 1077
