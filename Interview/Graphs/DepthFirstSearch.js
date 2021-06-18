/*
In DFS, we visit a node a and then iterate through each of a's neighbors. 
When visiting a node b that is a neighbor of a, we visit all of b's neighbors 
before going on to a's other neighbors. 

That is, a exhaustively searches b's branch before any of its other neighbors.
Note that pre-order and other forms of tree traversal are a form of DFS. 

The key difference is that when implementing this algorithm for a graph, 
we must check if the node has been visited. If we don't, we risk getting 
stuck in an infinite loop.

The pseudocode below implements DFS.
*/

const search = (root) => {
  if (root == null) return;
  visit(root);
  root.visited = true;
  for (n of root.adjacent) {
    if (n.visited == false) {
      search(n);
    }
  }
};
