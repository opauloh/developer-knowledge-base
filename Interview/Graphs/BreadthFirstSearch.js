/*
BFS is a bit less intuitive, and many interviewees struggle with the implementation
unless they are already familiar with it. 

The main tripping point is the (false) assumption that BFS is recursive. It's not. 

Instead, it uses a queue.

In BFS, node a visits each of a's neighbors before visiting any of their neighbors.
You can think of this as searching level by level out from a.

An iterative solution involving a queue usually works best.

If you are asked to implement BFS, the key thing to remember is the use of the queue.
The rest of the algo­ rithm flows from this fact.
*/

const search = (root) => {
  const queue = new Queue();
  root.marked = true;
  queue.enqueue(root); // Add to the end of queue
  while (!queue.isEmpty()) {
    const r = queue.dequeue(); // Remove from the front of the queue
    visit(r);
    for (n of r.adjacent) {
      if (n.marked == false) {
        n.marked = true;
        queue.enqueue(n);
      }
    }
  }
};
