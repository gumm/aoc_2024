import * as B from "badu";
import fs from 'fs';

/**
 * Read the input file by name
 * @param {string} filename
 * @returns {string}
 */
export const readFile = (filename) => {
  try {
    return fs.readFileSync(filename, 'utf8').trim();
  } catch (e) {
    console.log('Error:', e.stack);
  }
}

export const writeOutput = (filename, data) => {
  try {
    fs.writeFileSync(filename, data);
  } catch (e) {
    console.log('Error:', e.stack);
  }
}


/**
 * Removes whitespace from both ends of a string.
 * @param {string} e - The input string to trim.
 * @returns {string} The trimmed string.
 */
export const trimWhiteSpace = e => e.trim();

/**
 * Splits a multiline string into an array of lines.
 * @param {string} input - The input string with multiple lines.
 * @returns {string[]} An array of lines from the input string.
 */
export const splitNL = input => input.split('\n');

export const splitChar = input => input.split('');


/**
 *
 * @param func
 * @returns {function(*): *}
 */
export const splitOnWhiteSpace = (func = B.identity) =>
    line => line.split(/\s+/).map(func);


/**
 * Converts a space-separated string of numbers into an array of integers.
 * @param {string} line - A string containing space-separated numbers.
 * @returns {number[]} An array of parsed integers.
 */
export const lineToIntArr = line =>
  line.split(/\s+/).map(B.toInt);


/**
 * Logs a value to the console, and returns the value. Useful to inspect
 * variables inline, or as part of a function composition.
 * Can NOT log variadic input.
 * @param {*} e - The value to log.
 * @returns {*} The original input value.
 */
export const inspect = e => {
  console.log(e);
  return e
};

/**
 * Calculates the sum of all numbers in an array.
 * @param {number[]} arr - The input array of numbers.
 * @returns {number} The total sum of the array elements.
 */
export const sumArr = arr =>
  arr.reduce((a, b) => a + b, 0);


/**
 * Calculates the product of all numbers in an array.
 * @param {number[]} arr - The input array of numbers.
 * @returns {number} The total product of the array elements.
 */
export const productArr = arr =>
  arr.reduce((a, b) => a * b, 1);


/**
 * Creates a Map counting the occurrences of each unique element in an array.
 * @param {*[]} arr - The input array.
 * @returns {Map<*, number>} A Map with elements as keys and their count as values.
 */
export const mapWithCounts = arr => arr.reduce((prev, curr) => {
  if (prev.has(curr)) {
    prev.set(curr, prev.get(curr) + 1)
  } else {
    prev.set(curr, 1)
  }
  return prev;
}, new Map());

/**
 * Checks if a value is not NaN (Not a Number).
 * @param {*} e - The value to check.
 * @returns {boolean} True if the value is not NaN, false otherwise.
 */
export const isNotNaN = e => !isNaN(e);

/**
 * Calculates the differences between consecutive elements in an array.
 * @param {number[]} arr - The input array of numbers.
 * @returns {number[]} An array of differences between consecutive elements.
 */
export const diffList = arr =>
  arr.map((e, i, a) => e - a[i + 1]).filter(isNotNaN);

/**
 * Converts an array of numbers to their absolute values.
 *
 * This variable holds a function that takes an array of numbers as input
 * and returns a new array where each element is the absolute value
 * of the corresponding element in the input array.
 *
 * @param {number[]} arr - The array of numbers to be converted
 *      to absolute values.
 * @returns {number[]} A new array containing the absolute values
 *      of the input array.
 */
export const arrToAbs = arr => arr.map(Math.abs);

/**
 * Finds the minimum and maximum values in an array.
 * @param {number[]} arr - The input array of numbers.
 * @returns {number[]} An array containing [minimum, maximum] values.
 */
export const arrToMinMax = arr => [Math.min(...arr), Math.max(...arr)];

/**
 * Converts an array of numbers to an array containing the minimum
 * and maximum of the absolute values of the original array's elements.
 *
 * @param {number[]} arr - An array of numbers to be processed.
 * @returns {number[]} A two-element array where the first element
 * is the minimum absolute value and the second element is the maximum
 * absolute value from the input array.
 */
export const arrToAbsMinMax = arr => {
  const absArr = arrToAbs(arr);
  return [Math.min(...absArr), Math.max(...absArr)];
};

/**
 * Checks if all elements in an array are positive numbers.
 * @param {number[]} arr - The input array of numbers.
 * @returns {boolean} True if all elements are positive, false otherwise.
 */
export const allPositive = arr => arr.every(e => e > 0);

/**
 * Checks if all elements in an array are negative numbers.
 * @param {number[]} arr - The input array of numbers.
 * @returns {boolean} True if all elements are negative, false otherwise.
 */
export const allNegative = arr => arr.every(e => e < 0);

/**
 * Filters out falsy values from an array.
 * @param {*[]} arr - The input array.
 * @returns {*[]} An array containing only truthy values.
 */
export const filterOnlyTrue = arr => arr.filter(e => !!e);

/**
 * Comparison function for sorting numbers in ascending order.
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @returns {number} A negative value if a < b, positive if a > b, or zero if equal.
 */
export const sortNumeric = (a, b) => a - b;

/**
 * Creates an array of sub-arrays by removing one element at a time.
 * @example
 *   subSpecies(["A","B","C"])
 *   [ [ 'B', 'C' ], [ 'A', 'C' ], [ 'A', 'B' ] ]
 * @param {*[]} arr - The input array.
 * @returns {*[][]} An array of arrays, each with one element removed.
 */
export const subSpecies = arr =>
  arr.map((e, i, a) => a.toSpliced(i, 1));

/**
 * Checks if a given range is within the specified minimum and maximum boundaries.
 *
 * @function testBetween
 * @param {number} min - The minimum boundary value.
 * @param {number} max - The maximum boundary value.
 * @returns {function} - A function that accepts an array representing a range [minV, maxV].
 *                       It returns a boolean indicating whether the range [minV, maxV] falls within
 *                       the specified boundaries [min, max], inclusive.
 */
export const testBetween = (min, max) =>
  ([minV, maxV]) => minV >= min && maxV <= max;


/**
 * A function that rotates a given 2D matrix (array of arrays) 90
 * degrees clockwise.
 *
 * @example
 *  const matrix = [
 *    [ 1,2,3 ],
 *    [ 4,5,6 ],
 *    [ 7,8,9 ]
 *  ];
 *  rotateMatrix(matrix);
 *  [
 *    [ 1,4,7 ],
 *    [ 2,5,8 ],
 *    [ 3,6,9 ]
 *  ]
 *
 * @param {Array<Array<any>>} arr - The 2D array (matrix) to be rotated.
 * @returns {Array<Array<any>>} A new 2D array representing the rotated matrix.
 */
export const rotateMatrix = arr => {
  const colFunc = B.columnAt(arr)
  return arr[0].reduce((p, _, i) => {
    const col = colFunc(i);
    return [...p, col]
  }, [])
}

/**
 * Constructs a new 2D matrix (array of arrays) by transforming the input
 *  matrix, by moving each row to the right by its index number.
 * The resultant matrix is padded as needed to ba able to contain the original
 *  matrix.
 *  @example
 *    const matrix = [
 *      [ 1,2,3 ],
 *      [ 4,5,6 ],
 *      [ 7,8,9 ]
 *    ];
 *    skewMatrixRight(matrix, '')
 *    [
 *      [ 1,2,3, '', '' ],
 *      [ '', 4,5,6, '' ],
 *      [ '', '', 7,8,9 ]
 *    ]
 *
 * @param {Array<Array<*>>} arr - A two-dimensional array.
 * @param fill
 * @returns {Array<Array<*>>} A new skew-right matrix.
 */
export const skewMatrixRight = (arr, fill = '.') => arr.reduce(
  (p, c, i) => {
    const l = arr.length - 1;
    const newRow = [
      ...Array(i).fill(fill),
      ...c,
      ...Array(l - i).fill(fill)
    ];
    return [...p, newRow];
  }, [])


/**
 * Constructs a new 2D matrix (array of arrays) by transforming the input
 * matrix, by moving each row to the left by its index number.
 * The resultant matrix is padded as needed to be able to contain the
 * original matrix.
 * @example
 *    const matrix = [
 *      [ 1,2,3 ],
 *      [ 4,5,6 ],
 *      [ 7,8,9 ]
 *    ];
 *    skewMatrixRight(matrix, '')
 *    [
 *      [ '','',1,2,3 ],
 *      [ '',4,5,6,'' ],
 *      [ 7,8,9,'','' ]
 *    ]
 *
 * @param {Array<Array<*>>} arr - A two-dimensional array.
 * @param fill
 * @returns {Array<Array<*>>} A new skew-left matrix.
 */
export const skewMatrixLeft = (arr, fill = '.') => arr.reduce(
  (p, c, i) => {
    const l = arr.length - 1;
    const newRow = [
      ...Array(l - i).fill(fill),
      ...c,
      ...Array(i).fill(fill)
    ];
    return [...p, newRow];
  }, []);


/**
 * Creates a curried function to safely retrieve a value from a
 * matrix (2D array)
 * @example
 *  const matrix = [
 *    [ 1,2,3 ],
 *    [ 4,5,6 ],
 *    [ 7,8,9 ]
 *  ];
 *  const get = getInMatrix(matrix)
 *  get([1,1]) // 5
 *  get([5,5]) // undefined
 * @param {Array<Array<*>>} matrix - The 2D array to retrieve values from
 * @returns {function(Array<number>): *} A function that takes [row, column]
 *      coordinates and returns the value
 */
export const getInMatrix = matrix =>
  ([ri, ci]) => (matrix[ri] || [])[ci];

/**
 * Creates a curried function to safely set a value in a matrix (2D array)
 * @description Mutates the original matrix by setting a value at the
 * specified coordinates. It does nothing if the given coordinates
 * are outside of the matrix.
 * @example
 *    const matrix = [
 *      [ 1,2,3 ],
 *      [ 4,5,6 ],
 *      [ 7,8,9 ]
 *    ];
 *    let set = setInMatrix(matrix)
 *    set([1,1], "X")
 *    [
 *      [ 1, 2, 3 ],
 *      [ 4, 'X', 6 ],
 *      [ 7, 8, 9 ]
 *    ]
 * @param {Array<Array<*>>} matrix - The 2D array to modify
 * @returns {function(Array<number>, *): *} A function that takes [row, column]
 *      coordinates and a value to set
 */
export const setInMatrix = matrix =>
  ([ri, ci], c) => (matrix[ri] || [])[ci] = c;


export const isCoordInMatrix = matrix => {
  const w = matrix[0].length;
  const h = matrix.length;
  return ([r, c]) => r >= 0 && r < h && c >= 0 && c < w;
}


/**
 * Given a matrix, return the unique elements in it.
 * @param matrix Array<Array<*>> – The 2D array to retrieve values from
 * @returns {Array<*>}
 */
export const uniqInMatrix = matrix => [...new Set(matrix.reduce((p, c) => {
  return [...p, ...(new Set(c))]
}, []))]

/**
 * @param matrix Array<Array<*>> – The 2D array to retrieve values from
 * @returns {function(!*): Array<*>}
 */
export const findAllInMatrix = matrix => e => matrix.reduce(
  (p, row, ri) => {
    row.forEach((c, ci) => {
      if (c === e) {
        p.push([ri, ci])
      }
    })
    return p;
  }, []);


/**
 * Given a matrix, return a function that can take an array of coordinates,
 * and return a new array of the values of the matrix at each of those
 * coordinates.
 *
 * @example
 *  const matrix = [
 *    [ 1,2,3 ],
 *    [ 4,5,6 ],
 *    [ 7,8,9 ]
 *  ];
 *  const read = readMatrix(matrix)
 *  read([[0,0],[1,1],[2,2]]) // [ 1, 5, 9 ]
 *
 * @param {Array<Array<any>>} matrix - A two-dimensional array representing
 *      the matrix that contains elements to be processed.
 * @returns {Function} - A function that takes in an array of coordinates, and
 *      returns an array of matrix values at those coordinates.
 */
export const readMatrix = matrix => {
  const func = getInMatrix(matrix);
  return coords => coords.map(func);
}

/**
 * Writes a two-dimensional array (matrix) to a specified file.
 * @param {Array<Array<*>>} matrix - The matrix to be written to a file.
 *      It is a two-dimensional array where each sub-array represents a row.
 * @param {string} filename - The name of the file where the matrix
 *      will be written. The file will be created or overwritten
 *      with the matrix data.
 */
export const wireMatrixToFile = (matrix, filename) => {
  writeOutput(filename, matrix.map(e => e.join('')).join('\n'));
}

/**
 * A map of the multipliers needed when reading in a particular direction
 * in a matrix.
 */
export const cardinalMap = new Map()
  .set("N", [-1, 0])
  .set("S", [1, 0])
  .set("E", [0, 1])
  .set("W", [0, -1]);
cardinalMap.set("NE", [cardinalMap.get("N")[0], cardinalMap.get("E")[1]])
  .set("NW", [cardinalMap.get("N")[0], cardinalMap.get("W")[1]])
  .set("SE", [cardinalMap.get("S")[0], cardinalMap.get("E")[1]])
  .set("SW", [cardinalMap.get("S")[0], cardinalMap.get("W")[1]])

/**
 * Generates a function that calculates a sequence of coordinates
 * in a specified direction.
 *
 * @param {string} dir - The cardinal direction used to determine the direction
 *        of movement. It is expected to match a key in the `cardinalMap`.
 * @returns {function} - A function that, when called with an origin coordinate
 *          and a length, returns an array of coordinates moved in the specified
 *          direction.
 */
export const readDirection = dir => {
  const [rMod, cMod] = cardinalMap.get(dir);
  return ([r, c], length) => Array(length)
    .fill(null)
    .map((_, i) => [r + rMod * i, c + cMod * i]);
};

/**
 * Reverse the given heading in the matrix
 * @param {number!} r Row Index
 * @param {number!} c Column Index
 * @returns {number[]}
 */
export const reverseHeading = ([r, c]) => [r * -1, c * -1]


export const sumArrs = (arr1, arr2) => arr1.map((e, i) => e + arr2[i]);

export const difArrs = (arr1, arr2) => arr1.map((e, i) => e - arr2[i]);



/**
 * Generates all possible combinations of a given length using a set
 * of candidate elements. This blows up fast! For instance, 3 candidates in
 * arrangements of length 5 are 3^5 possibilities.
 * The length drives the growth, not the number fo candidates.
 *
 * @example
 *     makeCombos(2, ["A", "B", "C"])
 *     [
 *       [ 'A', 'A' ],
 *       [ 'A', 'B' ],
 *       [ 'A', 'C' ],
 *       [ 'B', 'A' ],
 *       [ 'B', 'B' ],
 *       [ 'B', 'C' ],
 *       [ 'C', 'A' ],
 *       [ 'C', 'B' ],
 *       [ 'C', 'C' ]
 *     ]
 *
 * @param {number} length - The length of each combination.
 * @param {Array} candidates - An array of candidate elements to be used for
 *      forming combinations.
 * @returns {Array} An array containing all possible combinations of
 *      the candidate elements, each of length `length`.
 */
export const makeCombos = (length, candidates) => {
  const func = (combo) => {
    if (combo.length === length) {
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


// Graph Utilities -------------------------------------------------------------
// The below utilities expect a graph to be described as a Map from a vertex to
// a Set of vertices to which the key points.
// const g = new Map([
//   ['A', new Set(['B', 'C'])],
//   ['B', new Set(['C', 'D'])],
//   ['C', new Set(['D'])],
//   ['E', new Set(['F'])],
//   ['F', new Set(['C'])],
//   ['D', new Set([])]
// ]);

/**
 * Inverts a graph from am Map of "x points-to these"
 * to a Map of "x is pointed to by these"
 * @param graph
 * @returns {*}
 */
export const graphInvert = graph => {
  return [...graph.entries()].reduce((p, [k, v]) => {
    p.set(k, p.has(k) ? p.get(k) : new Set());
    v.forEach(e => p.set(e, p.has(e)
      ? new Set([...p.get(e), k])
      : new Set([k]))
    );
    return p;
  }, new Map())
}

/**
 * Generates metadata information for a directed graph.
 *
 * @param {Map} graph - A Map representation of the directed graph,
 * where keys are node identifiers and values are Sets of connected
 * child node identifiers.
 * @returns {Object} - An object containing metadata about the graph, including:
 * - `inverted`: A Map representing the inverted graph where
 *      keys are node identifiers and values are Sets of
 *      parent node identifiers.
 * - `inDegrees`: A Map where keys are node identifiers and values are
 *      the in-degree count of the nodes (i.e., the number of edges coming
 *      into the node).
 * - `rootNodes`: An array of node identifiers representing the root nodes
 *      of the graph, which are nodes with an in-degree of zero.
 */
export const graphMetaInfo = graph => {
  const inverted = graphInvert(graph)
  const inDegrees = [...inverted.entries()].reduce(
    (p, [k, s]) => p.set(k, s.size), new Map());
  const rootNodes = [...inDegrees.entries()].reduce((p, [k, s]) => s ? p : [...p, k], []);
  return {inDegrees, rootNodes, inverted}
};

/**
 * Sorts the nodes of a directed graph topologically using Kahn's algorithm.
 *
 * This function takes a directed graph represented as a map or adjacency list
 * and returns an array representing a topological ordering of the graph's nodes.
 * It is assumed the graph is a Directed Acyclic Graph (DAG)
 *
 * @param {Map} graph - A DAG represented as an adjacency list, where the keys are
 *      the nodes and the values are arrays of nodes
 *      representing directed edges from the key node.
 * @returns {Array} An array of nodes representing a topological
 *      sort of the graph.
 *      The order respects the direction of the edges;
 *      for any directed edge u -> v, u appears before v.
 */
export const graphTopoSort = graph => {
  const {inDegrees, rootNodes} = graphMetaInfo(graph);
  const sorted = [];

  while (rootNodes.length) {
    const u = rootNodes.pop();
    sorted.push(u);
    graph.get(u).forEach(v => {
      inDegrees.set(v, inDegrees.get(v) - 1);
      if (inDegrees.get(v) === 0) {
        rootNodes.push(v);
      }
    });
  }
  return sorted;
};

/**
 * Computes the sum of all positive integers up to and including a given number.
 *
 * @param {number} n - The upper bound of the summation series.
 *    Must be a positive integer.
 * @returns {number} The sum of all positive integers up to and
 *    including n, or zero if n is less than or equal to zero.
 */
export const sigma = n => n <= 0 ? 0 : n + sigma(--n);

