// You are given a two-dimensional array (matrix) of potentially unequal height and width containing only 0s and 1s.
//  Each 0 represents land, and each 1 represents part of a river. A river consists of any number of 1s that are either
//  horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 1s forming a river determines its size.
// Write a function that returns an array of the sizes of all rivers represented in the input matrix. Note that these sizes
// do not need to be in any particular order.
// Sample Input:
// [
//   [1,0,0,1,0],
//   [1,0,1,0,0],
//   [0,0,1,0,1],
//   [1,0,1,0,1],
//   [1,0,1,1,0]
// ]

// Sample Output:
// => [1,2,2,2,5]

// Solution Attempt

// keep track of a visited set of nodes
// keep track of an array denoting all river sizes, initialized to an empty array
// iterate over the graph (matrix)
// for any node that has a 1 in it, and has not been visited, feed it into a helper function that will run a depth first search for any surrounding 1's
//      in that helper function, keep track of a stack that begins with the starting node passed in
//      pop the stack each iteration of a while loop (while the stack is not empty)
//      place that node in visited and use another helper function to find all the adjacent nodes (within range) to it that also have a 1
//      add those nodes to the stack if they have not been visited yet.
//      at the end of the dfs function, return the size of the current river
// push the size of that river to our allRiverSizes array, now that all its nodes have been visited and recorded
// after the nested for loop to traverse the matrix, return the array of river sizes

const riverSizes = (graph) => {
  const visitedNodes = new Set();
  const findAdjacencies = (coordinates) => {
    const row = coordinates[0];
    const col = coordinates[1];
    const rowAbove = row - 1;
    const rowBelow = row + 1;
    const colLeft = col - 1;
    const colRight = col + 1;
    const adjacencies = [];
    if (rowAbove >= 0 && graph[rowAbove][col] === 1) {
      adjacencies.push([rowAbove, col]);
    }
    if (rowBelow < graph.length && graph[rowBelow][col] === 1) {
      adjacencies.push([rowBelow, col]);
    }
    if (colLeft >= 0 && graph[row][colLeft] === 1) {
      adjacencies.push([row, colLeft]);
    }
    if (colRight < graph[row].length && graph[row][colRight] === 1) {
      adjacencies.push([row, colRight]);
    }

    return adjacencies;
  };

  const calculateRiverSize = (coordinates) => {
    const stack = [];
    stack.push(coordinates);
    currentRiverSize = 0;
    while (stack.length) {
      const currentCoords = stack.pop();
      currentRiverSize++;
      visitedNodes.add([...currentCoords].toString());
      const adjacentNodes = findAdjacencies(currentCoords);
      for (let adjacency of adjacentNodes) {
        if (!visitedNodes.has([...adjacency].toString())) {
          stack.push(adjacency);
        }
      }
    }
    return currentRiverSize;
  };
  const allRiverSizes = [];
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const currentCoordinates = [i, j];
      const currentCoordinatesAsString = [i, j].toString(); // convert to primitive data type for checking the set, as all reference data types (like arrays) will be unique even if they contain the same values as another
      const currentNode = graph[i][j];
      if (!visitedNodes.has(currentCoordinatesAsString) && currentNode === 1) {
        // we have found a new river.  Let's find its size.
        const riverSize = calculateRiverSize(currentCoordinates);
        allRiverSizes.push(riverSize);
      }
    }
  }
  return allRiverSizes;
};

const sampleInput = [
  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0],
];

console.log(riverSizes(sampleInput)); // [1,2,2,2,5] order does not matter
