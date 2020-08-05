/*
JSX Tips and Gotchas for Beginners

For the most part, JSX should feel pretty natural. There are a few things to be
aware of though.

Variables in JSX
Whenever you want to use an expression (something that produces a value) in JSX,
you need to wrap the expression in single curly braces, {}.

render() {
  const name = 'Tyler'

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Today is {new Date().toLocaleDateString()}</p>
      <p>What is 2 + 2? {2 + 2}</p>
    </div>
  )
}

Rendering nothing
If you want React to render nothing, return null.

render() {
  if (isLoading() === true) {
    return null
  }

  return (
    ...
  )
}
Conditional Rendering
The ability to conditionally render UI based on a piece of state is pretty
foundational to any front-end framework. Typically, this functionality is built
natively into the framework.

// Angular
<h1 *ngIf="authed; else elseBlock">Welcome back!</h1>
<ng-template #elseBlock><h1>Login to see your dashboard</h1></ng-template>

// Vue
<h1 v-if="authed">Welcome back!</h1>
<h1 v-else>Login to see your dashboard</h1>
With React, it’s a bit different. Instead of increasing the API surface layer,
because JSX is “Just JavaScript”, React can leverage native JavaScript features
to accomplish the same task. There are pros and cons to this approach, but if
you’re already familiar with conditional rendering in JavaScript, you’ll feel
pretty comfortable.

If/else
The most basic example is just using a simple if/else statement.

render() {
  const authed = isAuthed()

  if (authed === true) {
    return <h1>Welcome back!</h1>
  } else {
    return <h1>Login to see your dashboard</h1>
  }
}


Again, because we’re just writing JavaScript, if we had another conditional, we’d
just add an else if case.

render() {
  const authed = isAuthed()
  const firstLogin = isNew()

  if (firstLogin === true) {
    return <h1>👋 Welcome!</hi>
  } else if (authed === true) {
    return <h1>Welcome back!</h1>
  } else {
    return  <h1>Login to see your dashboard</h1>
  }
}
Ternary Operator
If you’re rendering different UI based on a single condition, typically you’d use
JavaScript’s ternary operator.

render() {
  return isAuthed() === true
    ? <h1>Welcome back!</h1>
    : <h1>Login to see your dashboard</h1>
}
We learned earlier that any expression needs to be wrapped in {}. We can use that
knowledge to render a ternary inside of JSX.

render() {
  return (
    <div>
      <Logo />
      {isAuthed() === true
        ? <h1>Welcome back!</h1>
        : <h1>Login to see your dashboard</h1>}
    </div>
  )
}
Earlier we also learned that we can render null if we want React to render nothing.
This is a common pattern when using ternaries.

render() {
  return (
    <div>
      <Logo />
      {showWarning() === true
        ? <Warning />
        : null}
    </div>
  )
}
Logical && Operator
If you’re not already familiar with it, JavaScript has an && operator.
Typically it’s used in conditionals as an “AND” statement.

if (user && authed) {}
In the example above, it’s important to note that authed won’t be checked if user
isn’t truthy. Using that logic, we can use the && operator as a more concise
ternary that renders null.

render() {
  return (
    <div>
      <Logo />
      {showWarning() === true && <Warning />}
    </div>
  )
}
React Fragments
Can you spot what’s wrong with the following JSX code?

render() {
  const name = 'Tyler'

  return (
    <h1>Hello, {name}</h1>
    <p>Today is {getDay()}</p>
    <p>What is 2 + 2? {2 + 2}</p>
  )
}
It looks fine, right? Unfortunately, it’ll throw an error.

Adjacent JSX elements must be wrapped in an enclosing tag.

That’s a fancy way to say that you can only ever return one top-level element
from a component. In our example, we’re trying to return 3. We can fix this by
wrapping everything in a div.

render() {
  const name = 'Tyler'

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Today is {getDay()}</p>
      <p>What is 2 + 2? {2 + 2}</p>
    </div>
  )
}
That fixes the issue, but now we have a semantic problem. We’re unnecessarily
creating an extra div. This is the exact use case that React.Fragment was created for.
If you want to return adjacent elements but don’t want to change your markup,
wrap them in <React.Fragment>.

render() {
  const name = 'Tyler'

  return (
    <React.Fragment>
      <h1>Hello, {name}</h1>
      <p>Today is {getDay()}</p>
      <p>What is 2 + 2? {2 + 2}</p>
    </React.Fragment>
  )
}
Much better.

There also exists a shorthand syntax for React Fragment, but I don’t use it.

render() {
  const name = 'Tyler'

  return (
    <>
      <h1>Hello, {name}</h1>
      <p>Today is {getDay()}</p>
      <p>What is 2 + 2? {2 + 2}</p>
    </>
  )
}
Capitalization
How does React know the difference between a custom React component like <User />
and a built-in HTML element like <span>? The answer is probably simpler than
you’d expect, it’s based on the capitalization. Whenever you create a React component,
you need to capitalize it. Otherwise, React will think it’s a built-in HTML element.
*/
