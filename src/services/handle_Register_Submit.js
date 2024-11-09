import { BASE_URL } from "../config";

export const handle_Register_Submit = async (e, { input, setState, addCurrentScore }, dispatch, navigate) => {
    e.preventDefault();
    if (!input.RegUsername || !input.RegPassword) {
        if (!input.RegUsername && !input.RegPassword) {
            setState((pre) => ({ ...pre, regEmptyUsername: true, regEmptyPassword: true }));
        } else {
            setState((pre) => ({
                ...pre,
                regEmptyUsername: !input.RegUsername,
                regEmptyPassword: !input.RegPassword,
            }));
        }

        return;
    }
    setState((pre) => ({ ...pre, loading: true, confTrue: false, regInputSuccess: false }))
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: input.RegUsername, password: input.RegPassword }),
    }

    await fetch(`${BASE_URL}/user/register`, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setState((pre) => ({ ...pre, loading: false }))
            const token = data.token;
            const userId = data.userId;
            const username = data.PlayerName;
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            if (data.message === 'exist') {
                setState((pre) => ({ ...pre, isExist: true, regEmptyUsername: true }))
                return;
            }
            setState((pre) => ({ ...pre, confTrue: true, regInputSuccess: true }))
            dispatch(addCurrentScore({ score: 0 }))
            setTimeout(() => {
                navigate('/welcome')
            }, 2500);

        })
        .catch((err) => console.error(err))

}