// Second Largest Node

// Write an algorithm that, given a Binary Search Tree, will find the second largest node in the tree. Assume you already have a bst Node class with an insert method.  Or, build the class yourself and guarantee you have an insert method.
// Example:
//         _10_
//       _/    \_
//      5        15
//     / \       / \
//    3   8     12  20
//   / \             \
//  2   4             30

// Output: 20

//      10
//     /
//    5
//   / \
//  3   7

// Output: 7

// One class that represents each Node of the tree

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Another class to represent the BinarySearchTree itself, instantiated with a root Node value

class BinarySearchTree {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  // That BinarySearchTree class should have an insert method that takes a value, and places that value at the correct level and side of the tree
  insert = (newValue, currentNode = this.root) => {
    if (currentNode.value > newValue) {
      if (currentNode.left === null) {
        const newNode = new Node(newValue);
        currentNode.left = newNode;
      } else {
        this.insert(newValue, currentNode.left);
      }
    } else {
      if (currentNode.right === null) {
        const newNode = new Node(newValue);
        currentNode.right = newNode;
      } else {
        this.insert(newValue, currentNode.right);
      }
    }
  };

  largestNode = (currentNode = this.root) => {
    if (!currentNode.right) {
      return currentNode.value;
    } else {
      return this.largestNode(currentNode.right);
    }
  };

  // BinarySearchTree can now have another method that returns the secondLargestNode of the tree (from the original pairboarding prompt)
  secondLargestNode = (currentNode = this.root) => {
    // start at the root of the tree (since technically this could be the secondLargestNode)
    if (currentNode.right) {
      if (currentNode.right.right || currentNode.right.left) {
        return this.secondLargestNode(currentNode.right);
      } else {
        // if the currentNode has a .right but that .right has no children, we are on the second to largest node
        return currentNode.value;
      }
    } else {
      // feed the .left of the currentNode to a method that finds the largestNode below that point
      return this.largestNode(currentNode.left);
    }
  };
}

const tree = new BinarySearchTree(10);
tree.insert(30);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(8);
tree.insert(12);
tree.insert(20);
tree.insert(2);
tree.insert(4);

const secondLargest = tree.secondLargestNode();
console.log(secondLargest); // 20

const tree2 = new BinarySearchTree(10);
tree2.insert(7);
tree2.insert(5);
tree2.insert(3);

const secondLargestOfTree2 = tree2.secondLargestNode();
console.log(secondLargestOfTree2); // 7

const firstTreeLargest = tree.largestNode(); // 30
console.log(firstTreeLargest);

const secondTreeLargest = tree2.largestNode(); // 10
console.log(secondTreeLargest);
