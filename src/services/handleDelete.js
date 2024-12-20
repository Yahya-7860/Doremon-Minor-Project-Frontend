import { toast } from "react-toastify"
import { BASE_URL } from "../config"

export const handleDelete = async ({ setState1, token, userId }, navigate) => {
    setState1((pre) => ({ ...pre, isLoading: true }))

    const option = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    }
    //will delete account
    await fetch(`${BASE_URL}/player/delete?id=${userId}`, option)
        .then((res) => res.json())
        .then((data) => {
            setState1((pre) => ({ ...pre, isLoading: false }))
            toast.success("Account Deleted Successfully")
            navigate("/")
        })

    //will delete score chart related to account
    await fetch(`${BASE_URL}/score/deleteScore?id=${userId}`, option)
        .then((res) => res.json())
        .then((data) => console.log(data))

}