// Lazy State Initialization
// To use lazy initialization, and calc expensive count just the first time, 
// use it as arrow function
// With setState, whenever you set the current state based on the previous state
// it’s recommended to pass a function as an argument to setState instead of an 
// object. The reason for this is state updates may be asynchronous. 
// There’s a lot of work happening under the hood when you call setState, 
// so for React to guarantee that the state value is up to date, they have you 
// pass them a function that receives state rather than relying on referencing 
// state from the component instance.

function getExpensiveCount() {
    console.log('calculating initial count')
    return 999
}

function Counter() {
    const [count, setCount] = React.useState(() => getExpensiveCount());

    const increment = () => setCount((count) => count + 1);
    const decrement = () => setCount((count) => count - 1);

    return (
        <React.Fragment>
            <button onClick={decrement}>-</button>
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
        </React.Fragment>
    );
}