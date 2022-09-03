## Terminologies in computer programming

### Arity

The arity of a function is the number of arguments a function expects at invocation.

### Unary Functions

Unary functions are functions that take only one argument, i.e. their arity is one.

### Variadic or Polyadic functions

Unary functions are functions that take more than one argument, i.e. their arity is two or more.

### Curried Functions

The simplest form of a curried function is a unary function that returns another unary function. The returned
function can also return another unary function. Returning nested unary functions continues in sequence to
achieve the results of a multi-argument function. This gives us the ability to call the function with one
argument at a time, sequentially.

```js
// This is a regular multi-argument function
const createMessage = (greeting, name, message) => {
  return `${greeting}, ${name}! ${message}`;
};

// And can be converted to a c curried function helping achieve the same thing
const createMessage = (greeting) => (name) => (message) => `${greeting}, ${name}! ${message}`;

// So now we can do this:
createMessage('Hello')('World')('Whadup?');
```

In Haskell, this is the technique used to deliver functions that effectively accept multiple arguments, but
one at a time. The word "curry" comes from Haskell Curry.

### Higher Order Functions

Curried functions are also **Higher Order Functions**, or HOFs -- as they always return other functions, and
also commonly take in the to-be-curried function.

### Variadic Curried Functions

A variadic curried function is a more sophisticated curried function that is able to take variable number of
arguments per call. Each returned function may take a single argument, or more than one argument. Basically,
we can also do this:

```js
createMessage('Hello', 'World')('Whadup?');
// or
createMessage('Hello')('World', 'Whadup?');
```

### Partials

Curried functions make it very convenient to generate partial functions:

```js
const greet = createMessage('Hello');
const goodMorning = createMessage('Good Morning');

const greetHaskell = greet('Haskell');
const greetAbdullah = greet('Abdullah');
const wishHaskell = goodMorning('Haskell');
```

### Auto-currying

Auto-currying is an advanced currying implementation technique, by making use of recursion. We track the
number of arguments passed, compare it to the multary function's arity, and use the comparison to decide
whether we should keep accepting more arguments by returning the accumulator recursively. Once we have enough
arguments, we terminate the accumulator and return a call to the to-be-curried function.
