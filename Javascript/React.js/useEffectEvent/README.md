Consider the following component:

```jsx
export default function App() {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(100);
  const [step, setStep] = React.useState(1);

  const handleDelayChange = (d) => setDelay(d);
  const handleStepChange = (s) => setStep(s);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => c + step);
    }, delay);

    return () => window.clearInterval(id);
  }, [delay, step]);

  return (
    <main>
      <h1>{count}</h1>
      <Slider min={100} max={2000} step={100} onChange={handleDelayChange} label="ms delay" />
      <Slider min={1} max={10} step={1} onChange={handleStepChange} label="increment by" />
    </main>
  );
}
```

The problem here is that we’re unnecessarily removing and re-adding the interval whenever delay or step
changes.

We want to be able to access the reactive step value from inside of `useEffect`, but we don’t want to include
it in the dependency array because it has nothing to do with setting and removing the interval.

This is the perfect use case for React’s new experimental hook, `useEffectEvent`. You can abstract the
reactive but non-synchronizing logic into `useEffectEvent`, then you can use that event handler inside of
useEffect without needing to include it as a dependency in the dependency array.

```jsx
import * as React from 'react';
import Slider from './Slider';

React.useEffectEvent = React.experimental_useEffectEvent;

export default function App() {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(100);
  const [step, setStep] = React.useState(1);

  const handleDelayChange = (d) => setDelay(d);
  const handleStepChange = (s) => setStep(s);

  const onInterval = React.useEffectEvent(() => {
    setCount(count + step);
  });

  React.useEffect(() => {
    const id = window.setInterval(onInterval, delay);

    return () => window.clearInterval(id);
  }, [delay]);

  return (
    <main>
      <h1>{count}</h1>
      <Slider min={100} max={2000} step={100} onChange={handleDelayChange} label="ms delay" />
      <Slider min={1} max={10} step={1} onChange={handleStepChange} label="increment by" />
    </main>
  );
}
```
