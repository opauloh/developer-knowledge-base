## Using useEffect Effectively

> by David Khourshid, React Advanced London 2022

### Conference Video

[![](https://img.youtube.com/vi/eFGeStq8dZo/0.jpg)](https://youtu.be/eFGeStq8dZo)

![](img/README-20221118115259.png)

Why use effect how twice on mount (react 18 strict mode)?

![](img/README-20221118115339.png)

![](img/README-20221118122357.png)

![](img/README-20221118122441.png)

Example of Active effect:

![](img/README-20221118122456.png)

So, where should Action effects go?

In event handlers!

![](img/README-20221118122617.png)

That's why if you tie an action event on rendering, react can trigger rerender for several reasons, and that
could keep causing the action to run multiple times

![](img/README-20221118122644.png)

So, action effects should happen outside of the rendering

![](img/README-20221118122752.png)

![](img/README-20221118123255.png)

As example, instead of using useEffect whenever a value change, to calculate something

![](img/README-20221118123305.png)

You can use useMemo!

![](img/README-20221118123314.png)

Or you might not even need to use useMemo, unless you are suffering from performance problems

![](img/README-20221118123405.png)

Easiest way to trigger infinite loop with useEffect 😂:

![](img/README-20221118123519.png)

You don't need effect for communicating with parents

![](img/README-20221118123544.png)

![](img/README-20221118123651.png)

Instead we can use the event handler:

![](img/README-20221118123715.png)

we don't use effect for subscriptions

![](img/README-20221118124101.png)

![](img/README-20221118124112.png)

Instead we can use the useSyncExternalStore hook

![](img/README-20221118124149.png)

don't use effect for fetching data

instead of fetching on effect ![](img/README-20221118125146.png)

just fetch as you need using your framework

(remix)

![](img/README-20221118125207.png)

(react query)

![](img/README-20221118125232.png)

So, the general recommendation for fetching in react is: always make sure to cache your requests

![](img/README-20221118125719.png)

so you can avoid the problems like:

- race conditions
- no instant back button (because hitting back would trigger a rerender that would trigger fetch again)
- no initial html content
- chasing waterfalls

![](img/README-20221118130008.png)

we are used to think that if we need something to run once component renders, we need to use effect

![](img/README-20221118130018.png)

then we end up doing something like this:

![](img/README-20221118130106.png)

and for global inits you can just wrap in a function (opinionated alert flag\*)

![](img/README-20221118130301.png)

![](img/README-20221118130158.png)

we don't need effect for user interactions

![](img/README-20221118130357.png)

![](img/README-20221118130406.png)

we can use the event handler:

![](img/README-20221118130457.png)

### Avoid use effect hell

when we have multiple use effects interacting with each other, like a video playback

![](img/README-20221118130704.png)

We can use an state machine to control that instead: (you can use with useReducer)

![](img/README-20221118130612.png)
