/* 
Write a method that takes an array and returns its duplicate values. Use less than O(n*n) time.

follow up questions:

Will all values be of the same type?  
If not, and we see '5', and 5 should we count those as two separate values?
Could the types of the values ever be references (arrays or objects)? 



Solution attempt

If we're only dealing with primitive values, we could initialize two empty sets.
As we iterate over the values, we check to see if the value is already in set1.  
If not, we add it to set1 and continue on.  But if it is in set1, we add it to set2.
Return set2 after the loop completes.

Iterating over the original primitive values (or using new Set(values)) and adding them to set1 would cost linear time and linear space.
Adding each duplicate value to set2 would also cost linear time and linear space (worst case, every value is duplicated)
Converting set2 into an array for a return value would cost linear time and space.

*/

const duplicates = (values) => {
  const uniqueVals = new Set();
  const duplicateVals = new Set();

  values.forEach((value) => {
    if (uniqueVals.has(value)) {
      duplicateVals.add(value);
    } else {
      uniqueVals.add(value);
    }
  });

  return Array.from(duplicateVals);
};

console.log(duplicates([1, 2, 2, 3, 4, 5, 5, 6, 7, 7, 8, 8, 8])); // [2, 5, 7, 8]
console.log(duplicates([1, 2, 3, 4, 5])); // []
console.log(duplicates([1, 1, 1, 1, 1])); // [1]
console.log(duplicates([])); // []
