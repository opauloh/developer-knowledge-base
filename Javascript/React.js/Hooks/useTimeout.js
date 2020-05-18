/*
With this hook, we can implement setTimeout using a declarative approach. First, we create a custom hook with a callback and a delay. Then we use the useRef hook to create a ref for the callback function. Finally, we make use of useEffect twice. One time for remembering the last callback and one time for setting up the timeout and cleaning up.
The example shows an implementation of a timer:
*/

const useTimeout = (callback, delay) => {
    const savedCallback = React.useRef();

    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setTimeout(tick, delay);
            return () => clearTimeout(id);
        }
    }, [delay])
};

/*
// Example :

const ExampleTimerFiveSeconds = props => {
    const [seconds, setSeconds] = React.useState(0);
    useTimeout(() => {
        setSeconds(seconds + 1);
    }, 5000);

    return <p>{seconds}</p>;
};

*/
