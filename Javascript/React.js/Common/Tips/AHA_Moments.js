/*
(Bonus) React "AHA" Moments
One of my main goals, whenever I’m teaching or writing technical content, is to
maximize “aha” moments. An “aha” moment is a moment of sudden insight or clarity;
when the subject matter suddenly makes sense. We’ve all experienced them, and the
best teachers I know can understand their audience and adapt the lesson to maximize
these moments.

Throughout the last few years, I’ve taught React in just about every medium.
Throughout that time I’ve been taking notes on what triggers these “aha” moments,
specifically for learning React. About two weeks ago I came across this Reddit
thread which had the same idea. So what I want to do in this post is to share my
collection of these moments while also adding my thoughts on some of the moments
shared in that Reddit thread. Hopefully, it will help React “click” for you if it
hasn’t yet.

fn(d) = V. Your UI is a function of your state and props are to components what
arguments are to functions.

One of the best parts of React is that you can use the same intuition that you have
about JavaScript functions for when and where you should create React components.
However, instead of your function taking in some arguments and returning a value,
your function is going to take in some arguments and return an object
representation of your UI. This idea can be summed up in the following formula,
fn(d) = V. A Function takes in some Data and returns a View. This is a beautiful
way to think about developing user interfaces because now your UI is just
composed of different function invocations. This is how you’re already used to
building applications and now you can take advantage of all of the benefits of
function composition when building UIs.

In React, your entire application’s UI is built using function composition and JSX
is an abstraction over those functions.

The most common reaction I see from first timers using React is “React seems cool,
but I really don’t like JSX. It breaks my separation of concerns”. JSX isn’t
trying to be HTML, and it’s definitely more than just a templating language.
There are two important things to realize with JSX. First, JSX is an abstraction
over React.createElement which is a function that returns an object representation
of the DOM. I know that was wordy but the tl;dr is that whenever you write JSX,
once it’s compiled, you’ll have a JavaScript object which represents the actual
DOM (or whatever View is representative of the platform you’re on, iOS, Android, etc).
Then React is able to analyze that object, diff it against the previous object
representation of the DOM it created, then update the DOM only where a change occurred.
This has some performance upsides to it but more importantly, shows that JSX really
is “just JavaScript”. Second, because JSX is just JavaScript, you get all the benefits
that JavaScript provides (composition, linting, debugging) but still with the
declarativeness (and familiarity) of HTML.

============
“Components don’t necessarily have to correspond to DOM nodes.”

When we first learn React, we’re taught that “Components are the building blocks of
React. They take in input and return some UI (descriptor)”. Does that mean that every
component needs to directly return UI descriptors as we’re typically taught?
What if we wanted to have a component render another component
(Higher Order Component pattern)? What if we wanted a component to manage some slice
of state and then instead of returning a UI descriptor, it returns a function
invocation passing in the state (Render Props pattern)? What if we had a component
that was in charge of managing sound rather than a visual UI, what would it return?
What’s great about React is you don’t have to return typical “views” from your components.
As long as what eventually gets returned is a React element, null, or false, you’re good.

============
You can return other components,
*/
class {
  render () {
    return <MyOtherComponent />
  }
}

// you can return function invocations,
class {
  render () {
    return this.props.children(this.someImportantState)
  }
}
// or, you can return nothing.
class {
  render () {
    return null
  }
}
/*
============
“When two components need to share state, I need to lift that state up instead of
trying to keep their states in sync.”

A component-based architecture naturally makes sharing state more difficult.
If two components rely on the same state, where should that state live? This was
such a popular question that it spurred an entire ecosystem of solutions which
eventually ended with Redux. Redux’s solution is to put that shared state in another
location called a “store”. Components can then subscribe to any portions of the
store they need and can also dispatch “actions” to update the store. React’s solution
is to find the nearest parent of both of those components and have that parent
manage the shared state, passing it down to the child components as needed.
There are pros and cons to both approaches, but it’s important to be aware that
both solutions exist.

============
“Inheritance is unnecessary in React, and both containment and specialization can
be achieved with composition.”

React has always been, for good reason, very liberal in adopting functional
programming principles. A precedent move away from inheritance and towards
composition was when the release of React 0.13 made it clear React wasn’t adding
support for Mixins with ES6 classes. The reason for this is because most everything
that can be accomplished with Mixins (or inheritance) can also be accomplished
through composition, but with less downsides. If you’re coming to React from an
inheritance heavy mindset, this new way of thinking may be difficult and probably won’t
feel too natural. If you’d like to read more, check out
JavaScript Inheritance vs Composition

============
“The separation of container and presentational components.”

If you think about the anatomy of a React component, it usually involves some state
 potentially some lifecycle hooks, and markup via JSX. What if, instead of having
 all of that in one component, we separate the state and the lifecycle hooks from the
 markup. This leaves us with two components. The first has state, life cycle methods,
 and is responsible for how the component works. The second receives data via props
 and is responsible for how the component looks. This approach allows us to have
 better reusability of our presentational components since they’re no longer coupled
 to the data they receive. I’ve also found that it will enable you
 (and newcomers to your project) to better understand the structure of your application.
 You’re able to swap out the implementation of a component without seeing or
 caring about the UI and vice versa - designers can tweak the UI without ever having
 to worry about how those presentational components are receiving data.

“If you try to keep most of your components pure, stateless things become a lot
simpler to maintain.”

This is another benefit of separating your presentational components from your
container components. State is the sidekick of inconsistency. By drawing the right
lines of separation, you’re able to drastically improve the predictability of your
application by encapsulating the complexity of it.
*/
