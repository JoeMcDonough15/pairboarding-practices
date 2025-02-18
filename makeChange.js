/* 

Make Change
Write a function that takes in an amount and a set of coins. Return the minimum number of coins needed to make change for the given amount. You may assume you have an unlimited supply of each type of coin. If it's not possible to make change for a given amount, return nil or NaN.

Example:

make_change(14, [10, 7, 1])
# return 2 because [7, 7] is the smallest combination

*/

const makeChange = (target, coins) => {
  const bestChange = findBestChange(target, coins);
  if (bestChange) {
    return bestChange.length;
  }
  return null;
};

const findBestChange = (target, coins, memo = {}) => {
  if (memo[target]) {
    return memo[target].slice();
  }
  if (target < 0) return null;
  if (target === 0) return [];

  let bestChange = null;

  const validCoins = coins.filter((coin) => coin <= target);

  validCoins.forEach((coin, index) => {
    const currentChange = findBestChange(
      target - coin,
      validCoins.slice(index),
      memo
    );
    if (currentChange) {
      currentChange.push(coin);
    }
    if (
      (!bestChange && currentChange) ||
      (bestChange && currentChange && currentChange.length < bestChange.length)
    ) {
      bestChange = currentChange;
    }
  });

  if (bestChange) {
    memo[target] = bestChange.slice();
  }

  return bestChange;
};

// Tests
console.log(makeChange(10, [1, 5])); // 2
console.log(makeChange(75, [1, 5, 10, 25])); // 3
console.log(makeChange(5, [10, 25])); // null
