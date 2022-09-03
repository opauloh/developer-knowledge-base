// curried function

// The simplest form of a curried function is a unary function that returns another unary function. The returned
// function can also return another unary function. Returning nested unary functions continues in sequence to
// achieve the results of a multi-argument function. This gives us the ability to call the function with one
// argument at a time, sequentially.

// This is a regular multi-argument function
const createMessageRegular = (greeting, name, message) => {
  return `${greeting}, ${name}! ${message}`;
};

createMessageRegular('Hello', 'World', 'Whadup?');

// And can be converted to a curried function helping achieve the same thing
const createMessageCurried = (greeting) => (name) => (message) => `${greeting}, ${name}! ${message}`;

// So now we can do this:
createMessageCurried('Hello')('World')('Whadup?');

// Also Important to note how we can achieve using a "normal" js function

function createMessageCurriedNormalFn(greeting) {
  return function (name) {
    return function (message) {
      return `${greeting}, ${name}! ${message}`;
    };
  };
}

// The outer function takes one argument and returns the first nested function,
// which when invoked with an argument will return its nested function, an so on.
// Notice, the return value of our interest is in the final return statement,
// which we could have achieved with a multi-argument function

// Variadic Curried Functions

// A variadic curried function is a more sophisticated curried function that is able to take variable number of
// arguments per call. Each returned function may take a single argument, or more than one argument. Basically,
// we can also do this:

const createMessageVariadicCurried = (greeting, name) => (message) => `${greeting}, ${name}! ${message}`;

createMessageVariadicCurried('Hello', 'World')('Whadup?');

// Partials

// Curried functions make it very convenient to generate partial functions:

const greet = createMessageCurried('Hello');
const goodMorning = createMessageCurried('Good Morning');

const greetHaskell = greet('Haskell');
// greetHaskell('how are you?')
// 'Hello, Haskell! how are you?'
const greetPaulo = greet('Paulo');
// greetPaulo('nice to meet ya')
// 'Hello, Paulo! nice to meet ya'
const wishHaskell = goodMorning('Haskell');
// wishHaskell('have a nice day!')
// 'Good Morning, Haskell! have a nice day!'

// Currying Existing Functions Manually

// Let's say, we have the function that returns the message string in hand:
function createMessage(greeting, name, message) {
  return `${greeting}, ${name}! ${message}`;
}
// Instead of writing a curried function from scratch for the above function,
// we can use the existing multary function by passing it to a wrapper function
// and then build the wrapper function on top of it:

function curryATernaryFunction(fnToBeCurried) {
  return function (greeting) {
    return function (name) {
      return function (message) {
        return fnToBeCurried(greeting, name, message); // 😮
      };
    };
  };
}

// Then calling the wrapper function with createMessage will give us the curried function:
const curriedCreateMessage = curryATernaryFunction(createMessage);
// curriedCreateMessage('Hi')('Haskell')('😮');
// > Hi, Haskell! 😮

// We could reuse the curryATernaryFunction to curry other ternary functions like this:

function addThreeThings(one, two, three) {
  return one + two + three;
}

// curryATernaryFunction(addThreeThings)(1)(2)(3)
// > 6

// How it works:
// The wrapper function is called an accumulator. Its purpose is to store all the passed in arguments
// and make them available to the multary function. It uses nested closures
// (the returned functions at each level of nesting along with their lexical environments)
// to accumulate all the arguments for the final returned function.

// The way it works is, every time a returned function is invoked and it takes its given argument,
// the argument is held at its immediately nested function's lexical scope - which makes it
// available to deeper ones via their scope chain. So, our core function's execution context
// is able to access all the arguments.

// Auto-currying

// Auto-currying is an advanced currying implementation technique, by making use of recursion. We track the
// number of arguments passed, compare it to the multary function's arity, and use the comparison to decide
// whether we should keep accepting more arguments by returning the accumulator recursively. Once we have enough
// arguments, we terminate the accumulator and return a call to the to-be-curried function.

// The Plan
// The key idea is to allow accepting only one argument at a time - as unarity is the essence of currying.
// Then we go ahead and store the arguments in an array, whose copy should be always accessible from
// the current execution context of the recursive stack.

function curry(f) {
  function curried(args) {
    if (args.length >= f.length) return f(...args);
    return accumulator;

    function accumulator(a) {
      return curried([...args, a]);
    }
  }

  return curried([]);
}

const autoCurriedCreateMessage = curry(createMessageRegular);

autoCurriedCreateMessage('Hi')('Haskell')('Whadup?');
// > Hi, Haskell! Whadup?
// since we're accepting only one argument at a time, passing other arguments don't make any difference
autoCurriedCreateMessage('Hi', 'Hello')('Haskell', 'Hasikell')('Whadup?', `What's up`);
// > Hi, Haskell! Whadup?

// we can also write our auto curry function like this
function curry(f) {
  return function curried(...args) {
    if (args.length >= f.length) return f(...args);
    return accumulator;

    function accumulator(...a) {
      return curried(...args, ...a);
    }
  };
}

const autoCurriedCreateMessage2 = curry(createMessageRegular);

autoCurriedCreateMessage2('Hi')('Haskell')('Whadup?');
// > Hi, Haskell! Whadup?
autoCurriedCreateMessage2('Hi', 'Hello')('Haskell', 'Hasikell');
// > 'Hi, Hello! Haskell'
autoCurriedCreateMessage2('Hi', 'Hello')('Haskell', 'Hasikell')('Whadup?', `What's up`);
// Uncaught TypeError: autoCurriedCreateMessage2(...)(...) is not a function

// Notice, the additional arguments are gracefully ignored by JavaScript.
// But additional currying will naturally throw an error, because we're trying to invoque a function
// from a primitive string value

// So basically, what we've done is allow the accumulator to take multiple arguments per call.
// It can be unary, as well as polyadic. We've lost the essence of currying.

// But now our curry() function is much more powerful. We can pass any number of
// arguments to an accumulator, as long as that is returned. And it is common to implement
// this with native JavaScript Function.prototype methods like this:
// with Function.protoype.apply
function curry(f) {
  return function curried(...args) {
    if (args.length >= f.length) return f(...args);
    return accumulator;

    function accumulator(...a) {
      return curried.apply(this, [...args, ...a]);
    }
  };
}

// with Function.prototype.bind
function curryBound(f) {
  return function curried(...args) {
    if (args.length < f.length) return curried.bind(null, ...args);
    return f(...args);
  };
}

// Refactoring curry() with Function.prototype.apply is not radically different in terms of the logic.
// We're just passing in the arguments args and a as part of an array instead of a list.

// However, with Function.prototype.bind, we are returning a bound function that
// binds incoming arguments recursively to a copy of itself till we are able to receive all required arguments.
// So, inside curryBound(), the curried() function at a current execution context is a bound copy of
// the curried() function called one level below it in the recursive stack with the arguments passed there.

// To be semantically more accurate, we should rename curryBound() to be partialize() and curried() to be bound():
function partialize(f) {
  return function bound(...args) {
    if (args.length < f.length) return bound.bind(null, ...args);
    return f(...args);
  };
}

// This is because, Function.prototype.bind applied here allows a variadic and more powerful
// partial application than unary currying. Really, this is nothing more than native JavaScript
// partial application with context binding and recursion.

const partializedCreateMessage = partialize(createMessageRegular);

partializedCreateMessage('Hi')('Haskell')('Whadup?');
// > Hi, Haskell! Whadup?
partializedCreateMessage('Hi', 'Hello')('Haskell', 'Hasikell');
// > 'Hi, Hello! Haskell'
partializedCreateMessage('Hi', 'Hello')('Haskell', 'Hasikell')('Whadup?', `What's up`);
// Uncaught TypeError: partializedCreateMessage(...)(...) is not a function

// What we're actually doing is, generating a series of variadic accumulators returned in sequence
// with good intentions, inspired by currying to begin with.
// This is probably what currying should idiomatically mean in the sphere of JavaScript.

// Variadic Currying with Termination

// we can go ahead and implement variadic currying by returning unary accumulators as well.
// This can be a case if our f() is variadic itself. Below, we have modified our createMessage() function
//  to produce a message for a given arbitrary number of text strings.
function createMessage(...texts) {
  return texts.reduce((combinedText, currentText) => combinedText + currentText, '');
}

// Here, we want to curry createMessage() with unary accumulators. And we can keep receiving as
// many arguments we want, without stopping.

// So, in order to produce a result from a curried variadic function, we have to decide
// on an arity for f() at some point. After we fix an arity of our desire for f() by
// passing in those arguments one at a time, we can terminate the accumulator.

// The idea is to terminate the accumulator when we receive an empty (undefined) argument
// and invoke f() with the available arguments. So, the empty parens, () acts as the terminator in this case.

function vCurry(f) {
  function curried(args) {
    return function accumulator(a) {
      if (args.length === 0 || a) return curried([...args, a]);
      return f(...args);
    };
  }

  return curried([]);
}

const vCurriedCreateMessage = vCurry(createMessage);
const messageHaskellShorter = vCurriedCreateMessage(
  'Hi Haskell,\n',
  `You can't see this.`
)(`I hope you're doing good!\n`)(`We're discussing currying here. Do you wanna join in?`, 'Bye');
const messageHaskell = vCurriedCreateMessage('Hi Haskell,\n')(`I hope you're doing good!\n`)(
  `We're discussing currying here. Do you wanna join in?\n`
)('See you soon!\n', 'Bye.');
const messageHaskellLonger = messageHaskell('Bye.')('\nPaulo');

messageHaskellShorter(); // Additional arguments ignored: `You can't see this.`
/*
Hi Haskell,
I hope you're doing good!
We're discussing currying here. Do you wanna join in?
*/

messageHaskell(); // Additional arguments ignored:  'Bye'
/*
Hi Haskell,
I hope you're doing good!
We're discussing currying here. Do you wanna join in?
See you soon!
*/

messageHaskellLonger(); // Extended from messageHaskell()
/*
Hi Haskell,
I hope you're doing good!
We're discussing currying here. Do you wanna join in?
See you soon!
Bye.
Paulo
*/

// Notice the messageHaskellLonger function. The curried function can be extended basing on that of a smaller
// arity to any arbitrary arity, before it gets terminated.

// Notice the messageHaskellLonger function. The curried function can be extended
// basing on that of a smaller arity to any arbitrary arity, before it gets terminated.
