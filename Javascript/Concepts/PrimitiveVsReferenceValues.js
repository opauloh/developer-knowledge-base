/*

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
*/
const age = 28 // primitive
const name = 'Tyler' // primitive
const loading = false // primitive
const user = undefined // primitive
const response = null // primitive
const counter = Symbol('counter') // primitive

const user = { name: 'Tyler' } // reference
const friends = ['Jake', 'Mikenzi'] // reference
const doThing = () => ({}) // reference

/*
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

*/