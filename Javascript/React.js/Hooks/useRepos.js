function useRepos(id) {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)

        fetchRepos(id)
            .then((repos) => {
                setRepos(repos);
                setLoading(false);
            })
    }, [id]);

    return [loading, repos];
}

/*
//Example

function ReposGrid({id}) {
    const [loading, repos] = useRepos(id);
    //
}

function Profile({user}) {
    const [loading, repos] = useRepos(user.id);
    //
}
*/
