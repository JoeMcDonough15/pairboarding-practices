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

console.log(maxOfThree([10, 3, 5, 6, 20])); // 1200
console.log(maxOfThree([-10, -3, -5, -6, -20])); // -90
console.log(maxOfThree([1, -4, 3, -6, 7, 0])); // 168
console.log(maxOfThree([-4, -3, -2, 0])); // 0
