// setGithubData will apply the value from the promise
//


function getGithubProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
}


function Profile({ username }) {
    const [githubData, setGithubData] = React.useState(null);

    React.useEffect(() => (
        getGithubProfile(username).then(setGithubData)
    ), [username])


    return (
        <div>
            {githubData !== null && <h1>{githubData.login}</h1>}
            {githubData !== null && <h1>{githubData.bio}</h1>}
            {githubData !== null && <img src={githubData.avatar_url} alt={githubData.login} />}
            <p>getGithubProfile will return an object full of properties
          related to the profile of whatever username you pass in as the first argument</p>
        </div>
    );
}
