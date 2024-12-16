import {
  makeMatrix,
  readFile,
  setInMatrix,
  splitNL,
  wireMatrixToFile
} from "../utils.js";

// Parse Input
const inputStrings = splitNL(readFile('aoc_14_0.txt'));
const width = 101;
const height = 103;

const steps = 7861; // This was obtained by trail and error 
                            // using grep -f on the output file.

const calcQuadrant = (width, height) => {
  const halfHeight = Math.floor(height / 2);
  const halfWidth = Math.floor(width / 2);
  return ([x, y]) => {
    if (x === halfWidth || y === halfHeight) return '--';
    const qx = x < halfWidth ? '0' : '1';
    const qy = y < halfHeight ? '0' : '1';
    return qx + qy;
  }
}
const quadrant = calcQuadrant(width, height);

// const move = (x, y, vx, vy, steps) => {
//   let nx = (x + (vx * steps)) % width;
//   let ny = (y + (vy * steps)) % height;
//   nx = nx < 0 ? width + nx : nx;
//   ny = ny < 0 ? height + ny : ny;
//   return [nx, ny];
// }

const stepVector = (vy, vx) => ([y, x]) => {
  let nx = x + vx;
  let ny = y + vy;
  if (nx >= width) {
    nx = nx - width;
  } else if (nx < 0) {
    nx = width + nx;
  }
  if (ny >= height) {
    ny = ny - height;
  } else if (ny < 0) {
    ny = height + ny
  }
  return [ny, nx];
}

const robotMap = inputStrings.reduce((p, c, i) => {
  const [a, b] = c.split(' ');
  const [x, y] = a.split('=')[1].split(',').map(Number);
  const [vx, vy] = b.split('=')[1].split(',').map(Number);
  const func = stepVector(vy, vx);
  const step = (setM) => {
    const me = robotMap.get(i);
    me.coord = func(me.coord);
    setM(me.coord, 'X');
    robotMap.set(i, me);
  };
  p.set(i, {coord: [y, x], step});
  return p;
}, new Map())

for (let i = 0; i < steps; i++) {
  const matrix = makeMatrix(height, width, '.');
  const setter = setInMatrix(matrix);
  robotMap.forEach(e => e.step(setter));
  wireMatrixToFile(matrix, `out.txt`);
  console.log(i);
}

