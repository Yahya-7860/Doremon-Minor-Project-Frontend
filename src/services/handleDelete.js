import { toast } from "react-toastify"

export const handleDelete = async ({ setState1, token, userId }, navigate) => {
    setState1((pre) => ({ ...pre, isLoading: true }))

    const option = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    }
    //will delete account
    await fetch(`http://localhost:3000/player/delete?id=${userId}`, option)
        .then((res) => res.json())
        .then((data) => {
            setState1((pre) => ({ ...pre, isLoading: false }))
            toast.success("Account Deleted Successfully")
            navigate("/")
        })

    //will delete score chart related to account
    await fetch(`http://localhost:3000/score/deleteScore?id=${userId}`, option)
        .then((res) => res.json())
        .then((data) => console.log(data))

}