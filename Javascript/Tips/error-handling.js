// You can use try / catch to handle errors in javascript

try {
  // something that can cause error
} catch (err) {
  console.error('something bad happened');
}

// ...It will catch any unhandled error, like runtime errors:

try {
  // typo on console
  cosole.log('test');
} catch (err) {
  console.error('something bad happened');
}

// and also errors that are programmatically defined, using throw new Error()
try {
  if (invalidCredentials(username, password)) {
    throw new Error(`Invalid username`);
  }
} catch (err) {
  // catch the Invalid username with err.message
  console.error('something bad happened: ' + err.message);
}

// error.cause()
// A recent javascript update also, upgraded the throw new error function, and now allows you to specify what caused the current error.
try {
  const validate = invalidCredentials(username, password);
  if (!validate.username) {
    throw new Error(`Invalid credentials`, { cause: 'invalid username' });
  }
  if (!validate.password) {
    throw new Error(`Invalid credentials`, { cause: 'invalid password' });
  }
} catch (err) {
  // catch the Invalid credentials with err.message
  // displays the root cause with err.cause
  console.error(`something bad happened: ${err.message} caused by ${err.cause}`);
}

// Worth noting that err.cause is only useful when proper defined and handled, and mostly useful when there are different causes for a same error
