/*
The every() method tests whether all elements in the array pass the test
implemented by the provided function. It returns a Boolean value.

*/
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true

/*
Syntax
arr.every(callback(element[, index[, array]])[, thisArg])
Parameters
callback
A function to test for each element, taking three arguments:
element
The current element being processed in the array.
index Optional
The index of the current element being processed in the array.
array Optional
The array every was called upon.
thisArg Optional
A value to use as this when executing callback.
Return value
true if the callback function returns a truthy value for every array element. Otherwise, false.
*/
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough); // false
[12, 54, 18, 130, 44].every(isBigEnough); // true

// Arrow functions provide a shorter syntax for the same test.

[12, 5, 8, 130, 44].every((x) => x >= 10); // false
[12, 54, 18, 130, 44].every((x) => x >= 10); // true
