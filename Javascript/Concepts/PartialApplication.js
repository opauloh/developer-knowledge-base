/*
The concept of having a function with multiple parameters
return a new function with fewer parameters is called
“Partial Application” and it’s a functional programming technique.
JavaScript’s “.bind” method is a common example of this
*/
function add(x, y) {
    return x + y
}

function makeAdder(x, addReference) {
    return function (y) {
        return addReference(x, y)
    }
}

const addFive = makeAdder(5, add)
const addTen = makeAdder(10, add)
const addTwenty = makeAdder(20, add)

addFive(10) // 15
addTen(10) // 20
addTwenty(10) // 30