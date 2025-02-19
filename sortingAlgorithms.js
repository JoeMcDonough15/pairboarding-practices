// (Question and solution taken from Interview Cake) You've created an extremely popular game. You rank players in the game from highest to lowest score.
// So far you're using an algorithm that sorts in O(nlogn) time, but players are complaining that their rankings aren't updated fast enough.
// You need a faster sorting algorithm.

// Write a function that takes:

// an array of unsorted_scores
// the highest_possible_score in the game
// and returns a sorted array of scores in less than O(nlogn) time.

// Example (don't give to interviewee; let them come up with their own inputs and outputs):

// unsorted_scores = [37, 89, 41, 65, 91, 53]
// HIGHEST_POSSIBLE_SCORE = 100

// sort_scores(unsorted_scores, HIGHEST_POSSIBLE_SCORE)
// # returns [37, 41, 53, 65, 89, 91]
// Clarification (again, not to be given out to interviewee unless asked for):

// In aiming for nlogn, we define n as the number of unsortedScores because we're expecting the number of players to keep growing.
// We'll treat highestPossibleScore as a constant instead of factoring it into our big O time and space costs, because the highest possible score
// won't change.

// Quicksort solution, out of place - not the optimal solution
// * Time Complexity:

// Best Case: O(n log n)

// Occurs when the pivot always divides the array into roughly equal halves
// We make log n levels of recursion
// At each level, we do O(n) work to partition the elements
// Total: O(n) * O(log n) = O(n log n)

// Average Case: O(n log n)

// Even with random pivot selection, we tend to get reasonably balanced partitions
// The math works out similarly to the best case

// Worst Case: O(n²)

// Occurs when we consistently pick the smallest or largest element as pivot
// Each partition only reduces the problem size by 1
// We need n levels of recursion
// Still doing O(n) work at each level
// Total: O(n) * O(n) = O(n²)

// * Space Complexity:

// O(n) for the out-of-place implementation
// We need additional arrays to store the partitioned elements
// The recursion stack space is O(log n) in the best/average case and O(n) in the worst case
// However, the dominating factor is the O(n) auxiliary space needed for the partitioning

const quicksort = (scores) => {
  // base case
  if (scores.length <= 1) {
    return scores;
  }
  // determine a pivot
  const pivot = scores[0];
  // initialize left and right partitions
  const leftHalf = [];
  const rightHalf = [];
  // loop over scores and divide up all the elements (except the pivot) into left and right halves
  for (let i = 1; i < scores.length; i++) {
    const currentScore = scores[i];
    if (currentScore < pivot) {
      leftHalf.push(currentScore);
    } else {
      rightHalf.push(currentScore);
    }
  }
  // recursively call quicksort with the left and right halves, and spread those arrays on the correct side of the pivot
  return [...quicksort(leftHalf), pivot, ...quicksort(rightHalf)];
};

const unsortedScores = [37, 89, 41, 40, 40, 40, 40, 65, 91, 53];

// console.log(quicksort(unsortedScores));

// Time Complexity - O(n * log(n)) // logarithmic to account for the recursive depth times linear to account for all the iterations we need to make over leftHalf and rightHalf in our merge helper function as well as the linear complexity slice() gives us to figure out what our left and right halves should encompass. --> log(n) * 2n, --> log(n) * n
// Space Complexity - O(n) // even though we are recursing, we shouldn't need to keep track of leftHalf, rightHalf, or mergedArray in any parent function calls; only the currently active function call.  Sequential storage vs. simultaneous storage.

const mergeSort = (scores) => {
  // base case
  if (scores.length < 2) {
    return scores;
  }
  // recursive case
  const midpoint = Math.floor(scores.length / 2);
  const leftHalf = scores.slice(0, midpoint);
  const rightHalf = scores.slice(midpoint);
  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  const sorted = merge(sortedLeft, sortedRight);
  return sorted;
};

const merge = (leftHalf, rightHalf) => {
  const mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
    const num1 = leftHalf[leftIndex];
    const num2 = rightHalf[rightIndex];
    if (num1 < num2) {
      mergedArray.push(num1);
      leftIndex++;
    } else {
      mergedArray.push(num2);
      rightIndex++;
    }
    // if either of the following conditions run, we are on the last iteration of the loop
    if (leftIndex === leftHalf.length) {
      // place remaining rightHalf nums into mergedArray
      mergedArray.push(...rightHalf.slice(rightIndex)); // use spread operator to avoid nesting the array .slice() returns inside mergedArray
    } else if (rightIndex === rightHalf.length) {
      // place remaining leftHalf nums into mergedArray
      mergedArray.push(...leftHalf.slice(leftIndex));
    }
  }
  return mergedArray;
};

console.log(mergeSort([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5]
console.log(mergeSort([30, 55, 83, 12, 34, 7, 2])); // [2, 7, 12, 30, 34, 55, 83]
console.log(mergeSort([])); // []

// Optimal Solution
// We can build an array scoreCounts where the indices represent scores and the values represent how many times the score appears in unsortedScores.
// Once we have that, we can generate a sorted array of the scores because the indices of scoreCounts
//  represent each score, and indices are naturally sorted

const sortScores = (unsortedScores, highestPossibleScore) => {
  // scoreCounts will give this algorithm a space complexity of O(n) because we need to make a new array that is the same length of unsortedScores
  const scoreCounts = new Array(highestPossibleScore + 1).fill(0);
  // linear time for this loop, to iterate over all the unsorted scores
  for (let i = 0; i < unsortedScores.length; i++) {
    // check what the score is
    const currentScore = unsortedScores[i];
    // use the currentScore as an index of scoreCounts, incrementing its value by 1
    scoreCounts[currentScore]++; // constant time operation here
  }
  // sortedScores also contributes to the O(n) space complexity, since this additional array will grow to be length of unsortedScores
  const sortedScores = [];
  // linear time to iterate over all the scoreCounts, placing each one in sortedScores.  Despite the nested loop inside this loop,
  // each iteration of the outer loop, we will place a new score in sortedScores, we will just place it the number of times it appears
  // in the original array unsortedScores
  scoreCounts.forEach((count, score) => {
    // use the index as the score, and put that score inside sortedScores the number of times that is the count
    // constant time here as the count is not based on input size that could change, it is a number value of times that the nested loop will run.
    for (let i = 0; i < count; i++) {
      sortedScores.push(score);
    }
  });

  return sortedScores;
};

// console.log(sortScores(unsortedScores, 100));

// Complexity
// O(n) time and space.

// Even though the solution has a nested loop towards the end, notice what those loops iterate over. The outer loop runs once for each unique number in the array. The inner loop runs once for each time that number occurred.

// So in essence we're just looping through the n numbers from our input array, except we're splitting it into two steps: (1) each unique number, and (2) each time that number appeared.  This must be done to account for tying scores.  What if 5 people all have a score of 50?
// Here's another way to think about it: in each iteration of the nested loop, we append one item to sortedScores. How many numbers end up in sortedScores in the end? Exactly how many were in our input array, n.

// Takeaways
// Counting is a common pattern in time-saving algorithms. It can often get you O(n) runtime, but at the expense of adding O(n) space. In an interview, being able to talk through these trade-offs and considerations will earn you brownie points with the interviewer.
// The reason we are able to implement a counting solution with O(n) time and space, is because we know the highest possible score that can be achieved.
// Without knowing that, the best time complexity we could get to sort would be O(n logn).
// Another constraint to this solution is that it cannot account for decimals.  If you were comparing averages, for example, indices have to be whole numbers
// so you could not rely on the accuracy to sort 85.6 below 85.7 out of a highest possible average of 100.
// Bonus: If the interviewee finishes early: Our solution returns a separate, sorted array. Could we instead sort the array in place?
// Does this change the time complexity? The space complexity?
// I don't believe we could do this in place.  To achieve the O(n) time complexity, we are relying on the additional array to keep count of the number
// of occuring scores saved at indices that are naturally sorted possible values in the original array.
