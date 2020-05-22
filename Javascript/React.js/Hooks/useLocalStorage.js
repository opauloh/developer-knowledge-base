function useLocalStorage(key) {
    let localStorageItem;
    if (key)
        localStorageItem = localStorage[key];

    const [localState, updateLocalState] = useState(
        localStorageItem
    );

    function syncLocalStorage(event) {
        if (event.key === key) {
            updateLocalState(event.newValue);
        }
    }

    useEffect(() => {
        window.addEventListener(
            "storage", syncLocalStorage
        );

        return () => {
            window.removeEventListener(
                "storage",
                syncLocalStorage
            );
        };
    }, []);

    return localState;
}

/*
Example

function Demo() {
    const name = useLocalStorage("name");
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}
*/
