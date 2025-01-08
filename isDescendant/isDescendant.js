const child = document.getElementById("child");
const parent = document.getElementById("parent");
const notParent = document.getElementById("not-a-parent");

function isDescendant(parent, child) {
  const childrenElements = Object.values(parent.children);
  if (childrenElements.length === 0) {
    return false;
  }
  for (currentChild of childrenElements) {
    const foundChild =
      currentChild === child || isDescendant(currentChild, child);
    if (foundChild) {
      return true;
    }
  }

  return false;
}

console.log(isDescendant(parent, child)); // true
console.log(isDescendant(notParent, child)); // false

/*
Cleaner, iterative solution 

function isDescendant(parent, child){
  while (child.parentNode) {
    if (child.parentNode == parent)
      return true;
    else
      child = child.parentNode;
  }

  return false;
}

Take note of the == vs. ===. child.parentNode will return a new instance of a node object, so we have to do a soft comparison.
*/
