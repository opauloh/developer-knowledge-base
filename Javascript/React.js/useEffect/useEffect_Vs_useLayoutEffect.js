/*

The simple rules for when to use each.

Both of these can be used to do basically the same thing, but they have slightly
different use cases. So here are some rules for you to consider when deciding
which React Hook to use.

useEffect
99% of the time this is what you want to use. When hooks are stable and if you
refactor any of your class components to use hooks, you'll likely move any code
from componentDidMount, componentDidUpdate, and componentWillUnmount to useEffect.

The one catch is that this runs after react renders your component and ensures
that your effect callback does not block browser painting. This differs from the
behavior in class components where componentDidMount and componentDidUpdate run
synchronously after rendering. It's more performant this way and most of the time
this is what you want.

However, if your effect is mutating the DOM (via a DOM node ref) and the DOM
mutation will change the appearance of the DOM node between the time that it is
rendered and your effect mutates it, then you don't want to use useEffect.
You'll want to use useLayoutEffect. Otherwise the user could see a flicker when
your DOM mutations take effect. This is pretty much the only time you want to
avoid useEffect and use useLayoutEffect instead.

useLayoutEffect
This runs synchronously immediately after React has performed all DOM mutations.
This can be useful if you need to make DOM measurements (like getting the scroll
  position or other styles for an element) and then make DOM mutations or trigger
  a synchronous re-render by updating state.

As far as scheduling, this works the same way as componentDidMount and componentDidUpdate.
Your code runs immediately after the DOM has been updated, but before the browser
has had a chance to "paint" those changes (the user doesn't actually see the
updates until after the browser has repainted).

Summary
useLayoutEffect: If you need to mutate the DOM and/or do need to perform measurements
useEffect: If you don't need to interact with the DOM at all or your DOM changes
are unobservable (seriously, most of the time you should use this).
*/
