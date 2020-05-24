/*
Now, say you had an array of numbers, [2,4,6]. Using forEach to iterate through 
each number, how would you add all of the numbers together to get a single 
value, 12? One approach might look like this.
*/
const nums = [2, 4, 6]
let state = 0

function sum(value) {
    state += value
}

nums.forEach(sum)

/*
With forEach, to add up all of the values, we need to create and manage an 
intermediate value (state) and modify it on each invocation. As this 
demonstrates, not only is forEach dependent on the state of our application, 
but it’s also modifying state outside of its own scope - this makes it an 
impure function. While not always bad, it’s best to avoid impure functions 
when you can. To accomplish the same functionality with a pure function, we can
use JavaScript’s reduce method.

Reduce
Reduce (also referred to as fold, accumulate, or compress) is a functional 
programming pattern that takes a collection (an array or object) as input and 
returns a single value as output. In JavaScript, the most common use of reduce 
is the reduce method all Arrays have access to. Applying reduce to our example 
above, our input would be nums and our output would be the summation of every 
value in nums.

The key difference between reduce and forEach is that reduce is able to keep 
track of the accumulated state internally without relying upon or modifying 
state outside of its own scope - that’s what makes it a pure function. 
The way it does this is, for each element in the collection, it invokes a 
reducer function passing it two arguments, the accumulated state and the 
current element in the collection. What the reducer function returns will be 
passed as the first argument to the next invocation of the reducer and will 
eventually result in the final value.
*/

const nums = [2, 4, 6]
const initialState = 0

function reducer(state, value) {
    return state + value
}