/*
The useFetch hook can be used to implement fetch in a declarative way.
First, we use useState to initialize the response and error state variables.
Then we use useEffect to asynchronously call fetch and update the state.
Finally, we return an object that contains the response/error variables.
The example shows a way to fetch a character from the Star Wars API and render 
its name:
*/

const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    return { response, error };
};

/*
// Example

const FetchPerson = props => {
    const res = useFetch('https://swapi.co/api/people/1/', {});
    if (!res.response) {
        return <div>Loading...</div>;
    }

    const person = res.response.name;
    return (
        <div>
            <span>{person}</span>
        </div>
    );
};

ReactDOM.render(<FetchPerson />, document.getElementById('root'));
*/
