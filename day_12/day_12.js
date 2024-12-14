import {
  crossAround,
  getInMatrix,
  inspect,
  makeMatrix,
  readFile,
  rotateMatrixRight,
  setInMatrix,
  splitChar,
  splitNL,
} from "../utils.js";

// 1424472
// 870202
const matrix = splitNL(readFile('aoc_12_0.txt')).map(splitChar);

// Containers for the results.
const get = getInMatrix(matrix);
const areaMap = new Map();
const seen = new Set()

// Helper function to build the sub-matrix for each region.
const findExtents = (matrix) => {
  return matrix.reduce(([[minR, minC], [maxR, maxC]], [row, col]) => {
    const minRR = row < minR ? row : minR;
    const maxRR = row > maxR ? row : maxR;
    const minCC = col < minC ? col : minC;
    const maxCC = col > maxC ? col : maxC;
    return [[minRR, minCC], [maxRR, maxCC]];
  }, [
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY]])
}

// Helper to check the marked neighbors of a position.
const check = (e, t) => {
  if (seen.has(e.join(t))) return [0, 0, []];
  seen.add(e.join(t));
  const matesAt = crossAround(e).filter(n => get(n) === t);
  const l = 4 - matesAt.length;
  return [1, l, matesAt];
}


matrix.forEach((row, ri) => {
  row.forEach((col, ci) => {
    const e = [ri, ci];
    const t = get(e);
    const name = e.join(t);
    if (seen.has(e.join(t))) return;

    // This is a new region.
    const members = [e];
    let [area, circ, mates] = check(e, t);
    while (mates.length > 0) {
      const n = mates.pop();
      members.push(n);
      const [a2, c2, m2] = check(n, t);
      area += a2;
      circ += c2;
      mates = mates.concat(m2.filter(e => !seen.has(e.join(t))));
    }
    areaMap.set(name, {t, members, area, circ});
  })
});

[...areaMap.entries()].forEach(([k, {t, members, area, circ}]) => {
  const [[minSr, minSc], [maxSr, maxSc]] = findExtents(members);
  const height = maxSr - minSr + 1;
  const width = maxSc - minSc + 1;
  const subMatrix = makeMatrix(height, width, '.');
  const subSet = setInMatrix(subMatrix);
  members.map(([r, c]) => [r - minSr, c - minSc]).forEach(e => subSet(e, t));
  areaMap.set(k, {t, members, area, circ, subMatrix, sides: 0});

  // If you want to see what the sub-matrix looks like, you can print it here...
  // wireMatrixToFile(subMatrix, `aoc_12_SUB_${k}.txt`)
});


const topOfMe = ([r, c]) => [r - 1, c];

[...areaMap.entries()].forEach(([k, {t, area, circ, subMatrix, sides}]) => {

  // For each row, count the number of times an element is marked, 
  // but has no neighbor to its top.
  // Once you start counting, don't increment the sides again.
  // Once an element fails, stop counting.
  const countTops = rotated => {
    const getSub = getInMatrix(rotated);
    rotated.forEach((row, ri) => {
      let busyCounting = false;
      row.forEach((col, ci) => {
        const me = [ri, ci];
        const iAmMarked = getSub(me) === t;
        const topIsOpen = getSub(topOfMe(me)) !== t;
        if (iAmMarked && topIsOpen) {
          if (busyCounting === false) {
            sides++;
            busyCounting = true;
          }
        } else {
          busyCounting = false;
        }
      })
    });
  };
  
  // Count the "tops" in the matrix in each of the 4 rotations.
  countTops(subMatrix, 0);

  const r1 = rotateMatrixRight(subMatrix);
  countTops(r1);

  const r2 = rotateMatrixRight(r1);
  countTops(r2);

  const r3 = rotateMatrixRight(r2);
  countTops(r3);

  areaMap.set(k, {t, area, circ, subMatrix, sides});
});

let totalTask1 = 0;
let totalTask2 = 0;
areaMap.forEach(({t, area, sides, circ}) => {
  totalTask1 += area * circ;
  totalTask2 += area * sides;
})
inspect(totalTask1)
inspect(totalTask2);
