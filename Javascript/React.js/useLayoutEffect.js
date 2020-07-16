/*
useLayoutEffect
This runs synchronously immediately after React has performed all DOM mutations.
This can be useful if you need to make DOM measurements (like getting the scroll
position or other styles for an element) and then make DOM mutations or trigger
a synchronous re-render by updating state.

As far as scheduling, this works the same way as componentDidMount and
componentDidUpdate. Your code runs immediately after the DOM has been updated,
but before the browser has had a chance to "paint" those changes (the user
doesn't actually see the updates until after the browser has repainted).

Summary
useLayoutEffect: If you need to mutate the DOM and/or do need to perform
measurements
useEffect: If you don't need to interact with the DOM at all or your DOM
changes are unobservable (seriously, most of the time you should use this).
*/
