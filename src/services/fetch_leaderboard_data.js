import { BASE_URL } from "../config"

export const fetch_leaderboard_data = async ({ setIsLoading, setUsers }) => {
    setIsLoading(true)
    await fetch(`${BASE_URL}/player/allScore`)
        .then((res) => res.json())
        .then((data) => {
            setIsLoading(false)
            setUsers(data.allScores)
        })
}