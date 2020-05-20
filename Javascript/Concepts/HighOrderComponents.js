/*

You can’t get very far into studying software development before you hear the 
(almost cultish) mantra of Don't Repeat Yourself or D.R.Y. Sometimes it can be 
taken a bit too far, but for the most part, it’s a worthwhile goal. In this post
we’re going to look at the most popular pattern for accomplishing DRY in a 
React codebase, Higher-Order Components. However before we can explore the 
solution, we must first fully understand the problem.



In JavaScript, functions are “first-class objects”. What that means is that just
like objects/arrays/strings can be assigned to a variable, passed as an argument
to a function, or returned from a function, so too can other functions.
*/

function add(x, y) {
    return x + y
}

function addFive(x, addReference) {
    return addReference(x, 5)
}

addFive(10, add) // 15

/*
Your brain might have got a little weird on this one if you’re not used to it.
We pass the add function as an argument to the addFive function, rename it
addReference, and then we invoke it.

When you do this, the function you’re passing as an argument is called a 
callback function and the function you’re passing the callback function to is 
called a higher-order function.

Because vocabulary is important, here’s the same code with the variables 
re-named to match the concepts they’re demonstrating.
*/

function add(x, y) {
    return x + y
}

function higherOrderFunction(x, callback) {
    return callback(x, 5)
}

higherOrderFunction(10, add)

/*
This pattern should look familiar; it’s everywhere. If you’ve ever used any of 
the JavaScript Array methods, jQuery, or a library like lodash, you’ve used both
higher-order functions and callbacks.
*/

[1, 2, 3].map((i) => i + 5)

_.filter([1, 2, 3, 4], (n) => n % 2 === 0);

$('#btn').on('click', () =>
    console.log('Callbacks are everywhere')
)

/*
Let’s go back to our example. What if instead of just creating an addFive 
function, we also wanted an addTen function, addTwenty function, etc. With our 
current implementation, we’d have to duplicate a lot of our logic whenever we 
needed a new function.
*/

function add(x, y) {
    return x + y
}

function addFive(x, addReference) {
    return addReference(x, 5)
}

function addTen(x, addReference) {
    return addReference(x, 10)
}

function addTwenty(x, addReference) {
    return addReference(x, 20)
}

addFive(10, add) // 15
addTen(10, add) // 20
addTwenty(10, add) // 30

/*
Again, this isn’t terrible, but we’re repeating a lot of the same logic. 
The goal here is to be able to create as many “adder” functions 
(addFive, addTen, addTwenty, etc) as we need while minimizing code duplication. 
To accomplish this, what if we create a makeAdder function? This function can 
take in a number and a reference to the original add function. 
Because the goal of this function is to make a new adder function, we can have 
it return a brand new function that accepts the number to add. 
That was a lot of words. Let’s see some code.
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

/*
Cool. Now we can make as many “adder” functions as we need while minimizing
the duplicate code we have to write.

If you care, this concept of having a function with multiple parameters
return a new function with fewer parameters is called
“Partial Application” and it’s a functional programming technique.
JavaScript’s “.bind” method is a common example of this.



Alright, but what does this have to do with React and the problem we saw
earlier of duplicating our hover logic anytime a new component needs it? Well
just as creating our makeAdder higher-order function allowed us to minimize
code duplication, so too can making a similar “higher-order component” help us
in the same way. However, instead of the higher-order function returning a new
function that invokes the callback, the higher-order component can return a new
component that renders the “callback” component 🤯.

That was a lot. Let’s break it down.

(Our) Higher-Order Function
- Is a function
- Takes in a callback function as an argument
- Returns a new function
- The function it returns can invoke the original callback function
  that was passed in

*/

function higherOrderFunction(callback) {
    return function () {
        return callback()
    }
}

/*
(Our) Higher-Order Component
- Is a component
- Takes in a component as an argument
- Returns a new component
- The component it returns can render the original component that was passed in

*/
function higherOrderComponent(Component) {
    return class extends React.Component {
        render() {
            return <Component />
        }
    }
}

/*

At this point, we’ve seen the benefits of using Higher-Order Components to 
reuse component logic amongst various components without duplicating code. 
But, does it have any pitfalls? It does, and we’ve already seen it.

When using a HOC, there’s an inversion of control happening. Imagine we were 
using a third part HOC like React Router’s withRouter HOC. According to their 
docs, "withRouter will pass match, location, and history props to the wrapped 
component whenever it renders."

*/
class Game extends React.Component {
    render() {
        const { match, location, history } = this.props // From React Router

        // ...
    }
}

export default withRouter(Game)
/*
Notice we’re not the ones creating the Game element (i.e. <Game />).
We’re handing over our component entirely to React Router and we’re trusting
them to not only render it but also pass it the correct props.
We saw this problem earlier when we talked about naming collisions with hovering.
To fix that we decided to let the consumer of our withHover HOC pass in a second
argument to configure what the prop name was going to be. With the 3rd party
withRouter HOC, we don’t have that option. If our Game component is already
using match, location, or history, we’re out of luck. We’d either have to modify
those names in our component or we’d have to stop using the withRouter HOC.
*/
