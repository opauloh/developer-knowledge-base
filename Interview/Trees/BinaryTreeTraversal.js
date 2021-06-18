/*
Prior to your interview, you should be comfortable implementing in-order, post-order, and pre-order
traversal. The most common of these is in-order traversal.
*/

// In-Order Traversal
/* In-order traversal means to "visit" (often, print) the left branch, then the current
node, and finally, the right branch.

When performed on a binary search tree, it visits the nodes in ascending order
(hence the name "in-order"). */

const inOrderTraversal = (node) => {
  if (node != null) {
    inOrderTraversal(node.left);
    visit(node);
    inOrderTraversal(node.right);
  }
};

// Pre-Order Traversal
/* Pre-order traversal visits the current node before its child nodes (hence the name "pre-order").
In a pre-order traversal, the root is always the first node visited. */

const preOrderTraversal = (node) => {
  if (node != null) {
    visit(node);
    preOrderTraversal(node.left);
    preOrderTraversal(node.right);
  }
};

// Post-Order Traversal
/* Post-order traversal visits the current node after its child nodes (hence the name"post-order").
In a post-order traversal, the root is always the last node visited. */
const postOrderTraversal = (node) => {
  if (node != null) {
    postOrderTraversal(node.left);
    postOrderTraversal(node.right);
    visit(node);
  }
};
