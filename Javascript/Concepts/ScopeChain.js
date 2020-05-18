/*
This process of the JavaScript engine going one by one and checking each
individual parent Execution Context if a variable doesn’t exist in the local
Execution Context is called the Scope Chain. JavaScript Visualizer shows
the Scope Chain by having each new Execution Context indented and with a unique
colored background. Visually you can see that any child Execution Context can
reference any variables located in any of its parent Execution Contexts,
but not vice versa.

*/