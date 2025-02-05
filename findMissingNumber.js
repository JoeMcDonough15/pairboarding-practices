/* you are given an unsorted array and are told that this array
   contains (n-1) of n consecutive numbers (where the bounds are
   defined).  write a method findMissingNumber that finds the missing
   number in O(n) time
  */
arrayOfIntegers = [2, 5, 1, 4, 9, 6, 3, 7];
upperBound = 9;
lowerBound = 1;

const findMissingNumber = (arrayOfIntegers, upperBound, lowerBound) => {
  // bucket solution
  /*
    run a pass to find max number
    make an array, set the capacity to be (upperBound - lowerBound) + 1
    that way you get indexes 0 through 8
    iterate through the array, subtracting the lowerBound from each element, and placing that element in the newArray
    iterate through the newArray until we find a falsy value; add that value's index to the lowerBound and that is the number to return
   */
  const newArray = new Array(upperBound - lowerBound + 1);
  for (const element of arrayOfIntegers) {
    newArray[element - lowerBound] = true;
  }

  for (let i = 0; i < newArray.length; i++) {
    const currentElement = newArray[i];
    if (!currentElement) {
      return i + lowerBound;
    }
  }
};

console.log(findMissingNumber(arrayOfIntegers, upperBound, lowerBound));
