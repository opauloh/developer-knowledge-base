// Often when transforming data, we need to process data in more than function:

const toUpperCase = (str) => str.toUpperCase();
const removeSpaces = (str) => str.replace(/\s/g, '');
const addExclamation = (str) => str + '!';

toUpperCase(removeSpaces(addExclamation('Format Me'))); // FORMATME

// With a Pipe function, Instead of doing something like that, we can instead, do something like this:

const pipe =
  (...fns) =>
  (input) =>
    fns.reduce((acc, fn) => fn(acc), input);

const formatString = pipe(toUpperCase, removeSpaces, addExclamation);

formatString('Format Me'); // FORMATME

// A pipe function allows us to chain multiple operations together by taking
// a series of functions as arguments and applying them in a specific order to the input.

// There’s currently a perpetual TC39 proposal for adding a true Pipe operator (|>) to JavaScript.
// https://github.com/tc39/proposal-pipeline-operator?ck_subscriber_id=905947838
