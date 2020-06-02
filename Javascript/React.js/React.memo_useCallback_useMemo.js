/*
One of the best parts of React is that you can use the same intuition that you 
have about regular JavaScript functions for when and where you should create React 
components. However, instead of your function taking in some arguments and 
returning a value, your function is going to take in some arguments (props) and 
return an object representation of your UI (JSX). Whenever the state of a 
component changes or it receives new props, the component will re-render, 
updating the UI.

With the advent of Hooks, this concept becomes even more applicable since React 
components are now literally just functions. Like normal functions, by default, 
any code you have in your component is going to get executed whenever the 
component re-renders. Typically this is fine, but occasionally you need a way to 
opt of re-rendering expensive components.

To see different strategies for accomplishing this, let’s imagine we were 
building an app that allowed users to find the nth number in the Fibonacci 
sequence as well as the nth prime number.

Here’s what one approach could look like. We’ll have two state values, fibCount 
and primeCount. fibCount for deriving the fibCount number in the Fibonacci 
sequence and primeCount for deriving the primeCount prime number. From there, 
we’ll create two components to do the heavy lifting for us, NthFib and NthPrime. 
Both will be passed their associated count as well as a way to increment that count.
*/
import React from 'react'
import { calculateFib, suffixOf } from './math'

function NthFib({ count, increment }) {
    const fib = calculateFib(count)

    return (
        <div className='container'>
            <h2>Nth Fib</h2>
            <p>
                The <b>{suffixOf(count)}</b> number
        in the fibonacci sequence is <b>{fib}</b>.
      </p>
            <button onClick={increment}>Next number</button>
        </div>
    )
}

export default NthFib
import React from 'react'
import { calculatePrime, suffixOf } from './math'

function NthPrime({ count, increment }) {
    const prime = calculatePrime(count)

    return (
        <div className='container'>
            <h2>Nth Prime</h2>
            <p>
                The <b>{suffixOf(count)}</b> prime
        number is <b>{prime}</b>.
      </p>
            <button onClick={increment}>Next prime</button>
        </div>
    )
}

export default NthPrime
import React from 'react'

function App() {
    const [fibCount, setFibCount] = React.useState(1)
    const [primeCount, setPrimeCount] = React.useState(1)

    const handleReset = () => {
        setFibCount(1)
        setPrimeCount(1)
    }

    const add10 = () => {
        setFibCount((c) => c + 10)
        setPrimeCount((c) => c + 10)
    }

    return (
        <React.Fragment>
            <button onClick={add10}>Add 10</button>
            <button onClick={handleReset}>Reset</button>
            <hr />
            <NthFib
                count={fibCount}
                increment={() => setFibCount((c) => c + 1)}
            />
            <hr />
            <NthPrime
                count={primeCount}
                increment={() => setPrimeCount((c) => c + 1)}
            />
        </React.Fragment>
    );
}
/*

Do you see any issues with this code? If not, play around with it for a bit and
see if you notice anything. Hint: it has to do with performance.

We know that with React, whenever a component receives new props or the state of
a component changes, it’ll re-render. Applied to our example, whenever fibCount
or primeCount change, the App component will re-render, and with it NthFib and
NthPrime.

On the surface, there doesn’t appear to be anything wrong here since it works
how you’d expect. However, both NthFib and NthPrime are computationally expensive.
We’re re-rendering both components on every render, regardless of if their count
prop changes. Instead, what we want to do is only re-render NthFib when fibCount
changes and only re-render NthPrime when primeCount changes. This way, we’ll
avoid unnecessarily re-rendering our computationally expensive components.
One tool we can use to accomplish this is React.memo.

React.memo
React.memo is a Higher-order component that lets you skip re-rendering a
component if its props haven’t changed. The way it does this is when a component
is wrapped in React.memo(), React will render the component and memoize the result.
On subsequent re-renders, React will perform a shallow comparison (===) between
the previous props and the new props - if the props haven’t changed, React will
skip rendering the component and reuse the last rendered result.

What this means for our example is we can wrap the exports of our computationally
expensive components (NthFib and NthPrime) in React.memo and they’ll only re-render
when their props change.

...

export default React.memo(NthFib)
...

export default React.memo(NthPrime)

So at this point, we’re good, right? Unfortunately, no. Even though we’re now
using React.memo, if you play around with the code, you’ll notice NthFib and
NthPrime are still re-rendering as much as they were before we added it.
Can you tell why? To better answer this, we need to hop over to vanilla
JavaScript land and talk about the difference between Primitive and Reference
values. If you’re already familiar with the topic, feel free to skip the next section.

Primitive vs. Reference Values
Whenever you create a variable in JavaScript, that variable can store one of two
types of data, a primitive value or a reference value. If the value is a number,
string, boolean, undefined, null, or symbol, it’s a primitive value. If it’s
anything else (i.e. typeof object), it’s a reference value.

Primitive Values
  number
  string
  boolean
  undefined
  null
  symbol

Reference Values
  anything that is "typeof" object
    objects
    arrays
    functions
const age = 28 // primitive
const name = 'Tyler' // primitive
const loading = false // primitive
const user = undefined // primitive
const response = null // primitive
const counter = Symbol('counter') // primitive

const user = { name: 'Tyler' } // reference
const friends = ['Jake', 'Mikenzi'] // reference
const doThing = () => ({}) // reference
On the surface, primitive values and reference values look the same, but under
the hood, they behave much differently. The key difference can be seen in how they store their value in memory. If you looked at the in-memory value of a primitive, you’d see the actual value itself (28, 'Tyler', false, etc). If you looked at the in-memory value of a reference type, you’d see a memory address (or a “reference” to a spot in memory). In practice, though, what difference does it make? Let’s take a look at some examples.

let surname = 'McGinnis'
let displayName = surname

surname = 'Anderson'

console.log(surname) // 'Anderson'
console.log(displayName) // 'McGinnis'
First, we create a variable called surname and assign the string McGinnis to it.
Then we create a new variable called displayName and assign it to whatever the
in-memory value of surname is, which happens to be McGinnis. From there we
change the in-memory value of surname to be Anderson. Now, when we log surname
we get Anderson and when we log displayName we get McGinnis. Though this example
demonstrates that the in-memory value of a primitive is the value itself, there’s
nothing surprising or really interesting going on here.

Let’s look at a similar example but instead of using a primitive value, let’s use
a reference value.

let leo = {
  type: 'Dog',
  name: 'Leo'
}

let snoop = leo

snoop.name = 'Snoop'

console.log(leo.name) // Snoop
console.log(snoop.name) // Snoop
First, we create a variable called leo and assign it to an object which has two
properties, type and name. Then we create a new variable called snoop and assign
it to whatever the in-memory value of leo is, which is the reference to the spot
in memory where the leo object is located. At this point, both leo and snoop are
referencing the same spot in memory. What that means is when we modify snoop.name,
because snoop and leo are referencing the same spot in memory, it’s as if we also
modified leo.name. That’s why when we log leo.name and snoop.name we get the
same value, Snoop.

Let’s look at one more example to cement your understanding. What do you think
happens when, using the identity operator (===), we compare two primitives that
have the same value?

const name = 'Tyler'
const friend = 'Tyler'

name === friend // true
Here we see that because name and friend have the same value, Tyler, when
comparing them, we get true. This probably seems obvious, but it’s important to
realize that the reason we get true is because, with the identity operator,
primitives are compared by their value. Since both values equal Tyler, comparing
them evaluates to true.

Now, what about reference values?

const leo = {
  type: 'Dog',
  name: 'Leo'
}

const leito = {
  type: 'Dog',
  name: 'Leo'
}

leo === leito // false
Even though leo and leito have the same properties and values, when comparing
them with the identity operator, we get false. The reason for that is because,
unlike primitive values, reference values are compared by their reference, or
their location in memory. Above, even though leo and leito have the same
properties and values, they’re occupying different locations in memory.

Both these examples demonstrate how primitive types are compared by their value,
while reference types are compared by their reference.

Fixing our React.memo
Alright, let’s jump back to our problem we were experiencing earlier with 
React.memo. We saw that even though we added React.memo, NthFib and NthPrime 
were still re-rendering as much as they were before we added it. After reading 
the previous section, you may have a hint as to why that is. React.memo uses the 
identity operator (===) to compare the previous props with the current props. 
For both our NthFib component and NthPrime component, we’re passing an inline 
function as the increment prop.
*/
<>
    <NthFib
        count={fibCount}
        increment={() => setFibCount((c) => c + 1)}
    />

    <NthPrime
        count={primeCount}
        increment={() => setPrimeCount((c) => c + 1)}
    />
</>
/*
This means for every render, we’re creating a brand new function in memory. 
Because functions are reference types, when React.memo compares the previous 
increment prop with the new increment prop, even though they appear the same, 
they’re compared by their references which will always be different.

We have two options to fix this. We can either customize React.memo to only 
compare the count props and ignore the increment props or we can make the 
increment props the same reference across renders.

To do the former, we can pass a function as the second argument to React.memo 
which will receive two arguments, the previous props and the current props. 
You can think of this function as a propsAreEqual function. If the propsAreEqual, 
return true and don’t re-render. If they’re not, return false and do re-render.

...
*/
export default React.memo(NthFib, (prevProps, nextProps) => {
    return prevProps.count === nextProps.count
})
/*
...
*/
export default React.memo(NthPrime, (prevProps, nextProps) => {
    return prevProps.count === nextProps.count
})
/*

That works fine for this scenario, but to me, the more interesting approach is to 
persist the references of the increment props across renders. This is where the
built-in useCallback Hook can help us out.

useCallback
useCallback returns a memoized callback. What this means is that any function 
you create with useCallback won’t be re-created on subsequent re-renders. It 
takes two arguments, a function and an array of values that the function depends 
on. The memoized function it returns will only change if one of the values in the 
dependency array change.
*/
const memoizedCallback = useCallback(() =>
    doSomething(a, b),
    [a, b],
)
/*
This is particularly useful for our use case because of the issues we ran into 
earlier with React.memo. Instead of passing an inline function as the increment 
prop and creating a brand new function on every render, we can utilize useCallback 
to create one function on the initial render, and reuse it on subsequent renders.
This means when React.memo compares the previous increment prop with the new 
increment prop, the reference will be the same and the identity operator (===) 
will work as expected.

...
*/
export default React.memo(NthFib)
/*
...
*/
export default React.memo(NthPrime)
function App() {
    const [fibCount, setFibCount] = React.useState(1)
    const [primeCount, setPrimeCount] = React.useState(1)

    const handleReset = () => {
        setFibCount(1)
        setPrimeCount(1)
    }

    const add10 = () => {
        setFibCount((c) => c + 10)
        setPrimeCount((c) => c + 10)
    }

    const incrementFib = React.useCallback(() =>
        setFibCount((c) => c + 1),
        []
    )
    const incrementPrime = React.useCallback(() =>
        setPrimeCount((c) => c + 1),
        []
    )

    return (
        <React.Fragment>
            <button onClick={add10}>Add 10</button>
            <button onClick={handleReset}>Reset</button>
            <hr />
            <NthFib
                count={fibCount}
                increment={incrementFib}
            />
            <hr />
            <NthPrime
                count={primeCount}
                increment={incrementPrime}
            />
        </React.Fragment>
    );
}
/*

To recap so far, we’ve seen how React.memo allows us to memoize an entire 
component based on its props. From there, because we were passing a reference 
type (a function) as a prop, we needed to use useCallback in order to get 
referential equality between renders so React.memo would work how we’d expect. 
Now, let’s look at a different approach.

If you think about our example more granularly, there are only two computationally 
expensive parts of our app, our calculateFib and calculatePrime functions. The 
reason we needed to reach for React.memo (and subsequently useCallback) was 
because we were invoking those functions inside of our NthFib and NthPrime components.

What if, instead of memoizing at the component level using React.memo, we memoize 
the expensive calculations themselves? So what we need is a way to tell React to 
only invoke calculateFib on re-renders where fibCount has changed and only invoke 
calculatePrime on re-renders where primeCount has changed, otherwise, use whatever 
the values were from the previous render. This is the exact use case for the 
built-in useMemo Hook.

useMemo
useMemo takes two arguments, a function and an array of values that the function 
depends on. It returns a value that will be computed on the initial render and 
whenever any of the values in the dependency array change.
*/
const memoizedValue = useMemo(() =>
    computeExpensiveValue(a, b),
    [a, b]
)
/*
Now, using our new-found knowledge of useMemo, we can get rid of React.memo and 
useCallback and only memoize the computationally expensive parts of our app, 
calculateFib and calculatePrime.
*/
import React from 'react'
import { calculateFib, suffixOf } from './math'

export default function NthFib({ count, increment }) {
    const fib = React.useMemo(() => calculateFib(count), [count])

    return (
        <div className='container'>
            <h2>Nth Fib</h2>
            <p>
                The <b>{suffixOf(count)}</b> number
        in the fibonacci sequence is <b>{fib}</b>.
      </p>
            <button onClick={increment}>Next number</button>
        </div>
    )
}
import React from 'react'
import { calculatePrime, suffixOf } from './math'

export default function NthPrime({ count, increment }) {
    const prime = React.useMemo(() => calculatePrime(count), [count])

    return (
        <div className='container'>
            <h2>Nth Prime</h2>
            <p>
                The <b>{suffixOf(count)}</b> prime
        number is <b>{prime}</b>.
      </p>
            <button onClick={increment}>Next prime</button>
        </div>
    )
}
import React from 'react'

function App() {
    const [fibCount, setFibCount] = React.useState(1)
    const [primeCount, setPrimeCount] = React.useState(1)

    const handleReset = () => {
        setFibCount(1)
        setPrimeCount(1)
    }

    const add10 = () => {
        setFibCount((c) => c + 10)
        setPrimeCount((c) => c + 10)
    }

    return (
        <React.Fragment>
            <button onClick={add10}>Add 10</button>
            <button onClick={handleReset}>Reset</button>
            <hr />
            <NthFib
                count={fibCount}
                increment={() => setFibCount((c) => c + 1)}
            />
            <hr />
            <NthPrime
                count={primeCount}
                increment={() => setPrimeCount((c) => c + 1)}
            />
        </React.Fragment>
    );
}
/*
💻 Play with the code.

It may seem like you can use useMemo to persist values across renders. However,
React treats useMemo as a performance hint rather than a guarantee. This means
that React may choose to forget previously memoized values under certain use
cases. To persist a value across renders, use useRef.

Caveats
As with any talk about performance, I feel obligated to include that performance
optimizations are never free. If they were, they’d be included by default. The
same applies to React.memo, useCallback, and useMemo. The default behavior of
React isn’t to memoize components, functions or values because the majority of
the time it’s unnecessary.
*/
