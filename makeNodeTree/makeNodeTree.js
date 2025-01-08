const targetDiv = document.getElementById("target");

const makeNodeTree = (targetNode, arrNodes) => {
  if (!arrNodes.length) {
    targetNode.innerText = "Done!";
  } else {
    const newNode = document.createElement(arrNodes[0]);
    targetNode.appendChild(newNode);
    makeNodeTree(newNode, arrNodes.slice(1));
  }
};

makeNodeTree(targetDiv, ["div", "section", "span", "p"]);
