/*
This hook is a small example of how to execute a callback right after a 
component is mounted.
For the second argument, we simply use useEffect with an empty array,
 to execute the provided callback once as soon as the component is mounted.
*/

const useComponentDidMount = onMountHandler => {
    React.useEffect(() => {
        onMountHandler()
    }, []);
}
/*
// Example
const MountComponent = () => {
    useComponentDidMount(() => console.log(' This component has been mounted'));

    return <div>Check your browser console</div>;
}

ReactDOM.render(<MountComponent />, document.getElementById('root'));
*/
