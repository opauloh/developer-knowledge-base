#### new react features 2023

- `useSyncExternalStore` makes it easier to subscribe to an external data source (for example, anything the
  browser already manages like localStorage or matchMedia) without needing to redundantly duplicate that state
  as React state in your component.

- `useEffectEvent` (which is still experimental but that’s never stopped you before) lets you abstract
  reactive but non-synchronizing values into their own event handler that can then be used inside of useEffect
  without needing to declare it in useEffect’s dependency array. This is helpful for those “I need to use this
  in the effect but I don’t want to re-apply the effect every time it changes” moments.

- `useDeferredValue` allows you to tell React to delay updating a value until all of its high priority work
  has finished. Why is that helpful? It allows you to give visual feedback to the user by deferring the
  re-rendering of expensive, non-urgent components.

- `startTransition` lets you explicitly tell React which updates are a lower priority. The way it does this is
  when any updates are wrapped inside of startTransition, React will treat that update with a lower priority
  and will interrupt it if a higher priority update like a user event happens.

- `Suspense` is a word you’ve probably heard a lot over the years. The whole goal of Suspense is to make
  reading data over the network as easy as using props or state. In practice, Suspense is just a React
  component that lets you declaratively specify the loading UI for any part of the component tree if it’s not
  yet ready to be displayed. It decouples reading the data from the loading UI that’s shown to the user and
  makes the loading UI a first-class concern that better aligns with React’s programming model.

- `Server Components` allow you to write UI that can be rendered and optionally cached on the server. Because
  they run on the server, you get a bunch of neat stuff out of the box like earlier and closer to your source
  data fetching, better security, caching, smaller bundle sizes, faster FCP and easier SEO.
