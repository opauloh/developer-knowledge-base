/*
This process of the JavaScript engine going one by one and checking each
individual parent Execution Context if a variable doesn’t exist in the local
Execution Context is called the Scope Chain. JavaScript Visualizer shows
the Scope Chain by having each new Execution Context indented and with a unique
colored background. Visually you can see that any child Execution Context can
reference any variables located in any of its parent Execution Contexts,
but not vice versa.


var name = 'Tyler'

function logName () {
  console.log(name)
}

logName()


What happens is if the JavaScript engine can’t find a variable local to the
function’s Execution Context, it’ll look to nearest parent Execution Context for
that variable. This lookup chain will continue all the way until the engine
reaches the Global Execution Context. In that case, if the Global Execution
Context doesn’t have the variable, it’ll throw a Reference Error.
*/