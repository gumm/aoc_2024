import {inspect, splitNL, readFile,} from "../utils.js";

let task1 = 0
let task2 = 0
const matrix = splitNL(readFile('aoc_9_e.txt')).map(e => e.split(''));
inspect(matrix);

inspect(task1);
inspect(task2);
