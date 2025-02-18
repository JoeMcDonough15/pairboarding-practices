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
    return memo[target].slice(); // shallow copy the reference in memo, so we don't mutate it when returning back a frame and pushing the current coin to it.
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

  // since bestChange could be null, we need the if check because we can't run .slice() on null
  if (bestChange) {
    memo[target] = bestChange.slice(); // always make a copy before saving to memo, so we do not mutate any memoized references.  Since bestChange is an array, we will potentially mutate it after returning out of this frame because we might be returning to a previous stack frame where we are going to push a coin to bestChange.  So store a copy of bestChange in memo before any mutation happens.
  }

  return bestChange; // since this could be null, it won't suffice to return a copy of what was stored in memo, we have to return what bestChange is
};

// Tests
console.log(makeChange(10, [1, 5])); // 2
console.log(makeChange(75, [1, 5, 10, 25])); // 3
console.log(makeChange(5, [10, 25])); // null
