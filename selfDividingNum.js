// A self-dividing number is a number that is divisible by every digit it contains. For example, 128 is a self-dividing number because 128 % 1 == 0, 128 % 2 == 0,and 128 % 8 == 0.
// Also, a self-dividing number is not allowed to contain the digit zero.
// Given a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.
// Example

// * Input: left = 1, right = 22
// * Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]

const eachDigitDivisibleByNum = (num) => {
  const numAsString = num.toString();
  for (const digit of numAsString) {
    const digitAsNum = Number(digit);
    if (digitAsNum === 0 || num % digitAsNum !== 0) {
      return false;
    }
  }
  return true;
};

const selfDividingNum = (left, right) => {
  const result = [];
  for (let num = left; num <= right; num++) {
    if (eachDigitDivisibleByNum(num)) {
      result.push(num);
    }
  }
  return result;
};

// Tests

// * Test 1
// Input: left = 1, right = 22
console.log(selfDividingNum(1, 22)); // * Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
