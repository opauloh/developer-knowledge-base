// We can use the useTransition hook in combination with React.Suspense
// to show a loading indicator while the data is being fetched
// For Example:
function Component() {
  const [startTransition, isPending] = React.useTransition();
  // etc...

  function handleClick() {
    // do something that triggers some interim state change we want to
    // happen before suspending starts
    startTransition(() => {
      // do something that triggers a suspending component to render
    });
  }

  // if needed, you can use the `isPending` boolean to display a loading spinner
  // or similar
}
