// Initially, there is a Robot at position (0, 0). Given a sequence of its moves, judge if this robot makes a circle, which means it moves back to the original place.
// The move sequence is represented by a string. And each move is represent by a character. The valid robot moves are R (Right), L (Left), U (Up) and D (down). The output should be true or false representing whether the robot makes a circle.
// Example

// Input: "UD"
// Output: true
// Example 2:
// Input: "LL"
// Output: false

// Solution

function robot(moves) {
  let x = 0;
  let y = 0;

  for (const char of moves) {
    switch (char) {
      case "U":
        y++;
        break;
      case "D":
        y--;
        break;
      case "R":
        x++;
        break;
      case "L":
        x--;
        break;
      default:
        break;
    }
  }

  return x === 0 && y === 0;
}

// Tests

// Test 1
console.log(robot("UD")); // true

// Test 2
console.log(robot("LL")); // false
