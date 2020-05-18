/*
useComponentWillUnmount is similar to the example above but will execute a 
callback as soon as the component is unmounted.
So we use useEffect again with an empty array as the second argument to execute
 the provided callback right before the cleanup.
*/

const useComponentWillUnmount = onUnmountHandler => {
    React.useEffect(() => () => {
        onUnmountHandler()
    }, []);
}
/*
// Example
const UnMountComponent = () => {
    useComponentWillUnmount(() => console.log(' This Component will unmount'));

    return <div>Check your browser console</div>;
}

ReactDOM.render(<UnMountComponent />, document.getElementById('root'));
*/
