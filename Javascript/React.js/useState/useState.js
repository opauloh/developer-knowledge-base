/*

What does useState allow you to do? Select all that apply.

- Add state to a function component
- Persist a value across renders
- Trigger a re-render of the component

What's wrong with this code?

*/
function Counter() {
    const [count, setCount] = React.useState(0)

    let id

    const clear = () => {
        window.clearInterval(id)
    }

    React.useEffect(() => {
        id = window.setInterval(() => {
            setCount(c => c + 1)
        }, 1000)

        return clear
    }, [])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={clear}>Stop</button>
        </div>
    )
}
/*
id will be redeclared and set to undefined whenever Counter re-renders
*/

