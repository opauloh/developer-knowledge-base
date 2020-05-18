/*

This is another great custom hook that we can use in our applications. With it, we can store props or the previous state. First, we create a custom hook that takes in a value. Then we use the useRef hook to create a ref for the value. Finally, we use useEffect to remember the latest value.
The example shows an implementation of a counter.

*/

const usePrevious = value => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

/*
// Example

const MoneyCount = () => {
    const [value, setValue] = React.useState(0);
    const lastValue = usePrevious(value);

    return (
        <div>
            <p>Current: {value} - Previous: {lastValue}</p>
            <button onClick={() => setValue(value + 1)}>Increment Money</button>
        </div>
    );
};

ReactDom.render(<MoneyCount />, document.getElementById('root'));
*/
