import {
  crossAround,
  findAllInMatrix,
  getInMatrix,
  inspect,
  readFile,
  splitNL,
  sumArr
} from "../utils.js";

const lineToMixArr = line =>
  line.split('').map(e => e === '.' ? e : e | 0);

const matrix = splitNL(readFile('aoc_10_0.txt')).map(lineToMixArr);
const get = getInMatrix(matrix);
const findAll = findAllInMatrix(matrix);

const walk = (coord, next, result, seen) => {
  if (get(coord) === 9) {
    const j = coord.join('');
    // Comment this line out for Task 2
    // if (seen.has(j)) return result;
    seen.add(j);
    return result + 1;
  }
  const around = crossAround(coord).filter(e => get(e) === next);
  return sumArr(around.map(e => walk(e, next + 1, result, seen)));
}

const result = findAll(0).map(e => walk(e, 1, 0, new Set()));
inspect(sumArr(result));
