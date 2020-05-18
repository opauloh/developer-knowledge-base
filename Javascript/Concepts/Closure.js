/*
Notice that after the makeAdder Execution Context has been popped off the
Execution Stack, JavaScript Visualizer creates what’s called a Closure Scope.
Inside of that Closure Scope is the same variable environment that existed in
the makeAdder Execution Context. The reason this happened is because we have a
function nested inside of another function. In our example, the inner function
is nested inside of the makeAdder function, so inner creates a Closure over the
makeAdder variable environment.
Even after the makeAdder Execution Environment has been popped off the
Execution Stack, because that Closure Scope was created, inner has access to
the x variable (via the Scope Chain).

As you probably guessed, this concept of a child function “closing” over the
variable environment of its parent function is called Closures.

*/