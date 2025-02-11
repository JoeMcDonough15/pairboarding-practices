const maxOfThree = (nums) => {
  nums.sort((num1, num2) => {
    return Math.abs(num2) - Math.abs(num1);
  });

  let i = 0;
  let j = 1;
  let k = 2;

  let largestProduct = -Infinity;

  while (i < nums.length && j < nums.length && k < nums.length) {
    const product = nums[i] * nums[j] * nums[k];

    if (product > largestProduct) {
      largestProduct = product;
    }

    i++;
    j++;
    k++;
  }

  return largestProduct;
};

// Scan the array and compute Maximum, second maximum and third maximum element present in the array.
// Scan the array and compute minimum and second minimum element present in the array.
// Return the maximum of product of max1, max2, and max3 and product of max1, min1, min2
// The reason we use this approach is because we have to account for negative numbers. Our max product will either be from the 3 max numbers, or will be from the max number and the 2 minimum numbers (if they are negative).

function maxOfThree(array) {
  // Set up out variables. It's ok if we simply set them all to the first element of the array.
  let max1 = array[0],
    max2 = array[0],
    max3 = array[0];
  let min1 = arr[0],
    min2 = arr[0];

  for (let i = 0; i < array.length; i++) {
    // Handle updating maximum
    if (array[i] > max1) {
      // if this is true, we must update *all* maximum variables, essentially shifting them all down 1.
      max3 = max2;
      max2 = max1;
      max1 = array[i];
    } else if (arr[i] > max2) {
      // Same idea...
      max3 = max2;
      max2 = array[i];
    } else if (array[i] > max3) {
      max3 = array[i];
    }

    // Handle updating minimum
    if (array[i] < min1) {
      min2 = min1;
      min1 = array[i];
    } else if (array[i] < min2) {
      min2 = array[i];
    }
  }

  return Math.max(max1 * max2 * max2, max1 * min1 * min2);
}

console.log(maxOfThree([10, 3, 5, 6, 20])); // 1200
console.log(maxOfThree([-10, -3, -5, -6, -20])); // -90
console.log(maxOfThree([1, -4, 3, -6, 7, 0])); // 168
console.log(maxOfThree([-4, -3, -2, 0])); // 0
