React.useEffect(() => {
    // Will be invoked on the initial render
    // and all subsequent re-renders
})

React.useEffect(() => {
    // Will be invoked on the initial render
    // and when "id" or "authed" changes
}, [id, authed])

React.useEffect(() => {
    // Will be invoked on the initial render
}, [])


//Clean up
React.useEffect(() => {
    return () => {
        // invoked right before invoking
        // the new effect on a re-render and
        // right before removing the component
        // from the DOM
    }
})