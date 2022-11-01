// This new method on arrays lets us get the value at a specific index
// example

const arr = ['car', 'cat', 'person'];

console.log(arr.at(0));
// 'car'

console.log(arr.at(1));
// 'cat'

console.log(arr.at(2));
// 'person'

// It also includes negative indices.
console.log(arr.at(-2));
// 'cat';

// Use negative indices to returns a value from the end of the array,
// (currently the easier way to get the last item of an array.)

console.log(arr.at(-1));
('person');
