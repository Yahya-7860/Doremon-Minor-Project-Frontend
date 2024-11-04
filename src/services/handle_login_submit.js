export const handle_login_submit = async (e, { input, setState, addCurrentScore }, dispatch, navigate) => {
    e.preventDefault();

    if (!input.LogUsername || !input.LogPassword) {
        if (!input.LogUsername && !input.LogPassword) {
            setState((pre) => ({ ...pre, logEmptyUsername: true, logEmptyPassword: true }));
        } else {
            setState((pre) => ({
                ...pre,
                logEmptyUsername: !input.LogUsername,
                logEmptyPassword: !input.LogPassword,
            }));
        }
        return
    }
    setState((pre) => ({ ...pre, loading: true, confTrue: false, logInputSuccess: false }))
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: input.LogUsername, password: input.LogPassword }),
    }

    await fetch("http://localhost:3000/user/login", options)
        .then((res) => res.json())
        .then((data) => {
            setState((pre) => ({ ...pre, loading: false }))
            const token = data.token;
            const userId = data.userId;
            const username = data.PlayerName;
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            localStorage.setItem('username', username)
            if (data.message === "invalid user") {
                setState((pre) => ({ ...pre, invalidUser: true, logEmptyUsername: true }))
                return;
            }
            else if (data.message === "invalid password") {
                setState((pre) => ({ ...pre, wrongPass: true, logEmptyPassword: true }))
                return;
            }
            setState((pre) => ({ ...pre, confTrue: true, logInputSuccess: true }))
            dispatch(addCurrentScore({ score: 0 }))
            setTimeout(() => {
                navigate('/welcome')
            }, 2500);



        })
        .catch((err) => console.log(err))
}