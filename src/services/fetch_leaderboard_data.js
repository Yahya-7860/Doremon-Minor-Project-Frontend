export const fetch_leaderboard_data = async ({ setIsLoading, setUsers }) => {
    setIsLoading(true)
    await fetch("http://localhost:3000/player/allScore")
        .then((res) => res.json())
        .then((data) => {
            setIsLoading(false)
            setUsers(data.allScores)
        })
}