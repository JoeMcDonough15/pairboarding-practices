// Second Largest Node

// Write an algorithm that, given a Binary Search Tree, will find the second largest node in the tree. Assume you already have a bst Node class with an insert method.
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
}

const tree = new BinarySearchTree(10);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(8);
tree.insert(12);
tree.insert(20);
tree.insert(2);
tree.insert(4);
tree.insert(30);
