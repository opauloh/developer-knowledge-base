/*
If you want to implement setInterval in a declarative manner you can use this
 hook called useInterval.
First, we have to create a custom hook taking in a callback and a delay.
Then we use useRef to create a ref for the callback.
Finally, we use useEffect to remember the latest callback and to set up the
 interval and clean up.
The example shows an implementation for a custom ResourceCounter that can be
 used in a browser game, for example.
*/
const useInterval = (callback, delay) => {
    const savedCallback = React.useRef();

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
/*
// Example
const ResourceCounter = props => {
    const [resources, setResources] = React.useState(0);
    useInterval(() => {
        setResources(resources + 2);
    }, 2500);

    return <p>{resources}</p>;
};

ReactDOM.render(<ResourceCounter />, document.getElementById('root'));
*/
