import React, { useRef, useState } from "react";
import styles from "../CSS Folder/login_signup.module.css"
import { useNavigate } from "react-router-dom";
import ConfettiExplosion from 'react-confetti-explosion'

function Login_signup() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        RegUsername: '',
        RegPassword: '',
        LogUsername: '',
        LogPassword: ''
    });

    const [state, setState] = useState({
        isExist: false,
        confTrue: false,
        invalidUser: false,
        wrongPass: false
    });

    const containerRef = useRef(null)
    const handleSignupClick = () => {
        containerRef.current.classList.add(styles.sign_up_mode);
    };
    const handleSigninClick = () => {
        containerRef.current.classList.remove(styles.sign_up_mode);
    };
    const handle_Register_Submit = async (e) => {
        e.preventDefault();
        setState((pre) => ({ ...pre, confTrue: false }))
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: input.RegUsername, password: input.RegPassword }),
        }

        await fetch("http://localhost:3000/user/register", options)
            .then((res) => res.json())
            .then((data) => {
                const token = data.token;
                localStorage.setItem('token', token);
                if (data.message === 'exist') {
                    setState((pre) => ({ ...pre, isExist: true }))
                    return;
                }
                setState((pre) => ({ ...pre, confTrue: true }))
                // navigate('/welcome')

            })
            .catch((err) => console.error(err))

    }

    const handle_login_submit = async (e) => {
        e.preventDefault();
        setState((pre) => ({ ...pre, confTrue: false }))
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
                const token = data.token;
                localStorage.setItem('token', token)
                if (data.message === "invalid user") {
                    setState((pre) => ({ ...pre, invalidUser: true }))
                    return;
                }
                else if (data.message === "invalid password") {
                    setState((pre) => ({ ...pre, wrongPass: true }))
                    return;
                }
                navigate('/welcome')

            })
            .catch((err) => console.log(err))
    }
    return <>
        <div ref={containerRef} className={styles.container}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    {/* login */}
                    <form className={styles.sign_in_form} onSubmit={handle_login_submit}>
                        <h2 className={styles.title}>Sign in</h2>
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_user}`}></i>
                            <input type="text" placeholder="Username" value={input.LogUsername} onChange={(e) => {
                                setInput((pre) => ({ ...pre, LogUsername: e.target.value }));
                                setState((pre) => ({ ...pre, invalidUser: false }))

                            }} />
                        </div>
                        {state.invalidUser && <p className={styles.isInvalid}>Invalid Username</p>}
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_lock}`}></i>
                            <input type="password" placeholder="Password" value={input.LogPassword} onChange={(e) => {
                                setInput((pre) => ({ ...pre, LogPassword: e.target.value }))
                                setState((pre) => ({ ...pre, wrongPass: false }))
                            }} />
                        </div>
                        {state.wrongPass && <p className={styles.isInvalid}>Wrong Password</p>}
                        <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
                    </form>
                    {/* register */}
                    <form className={styles.sign_up_form} onSubmit={handle_Register_Submit} >
                        <h2 className={styles.title}>Sign up</h2>
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_user}`}></i>
                            <input type="text" placeholder="Username" value={input.RegUsername} onChange={(e) => {
                                setInput((pre) => ({ ...pre, RegUsername: e.target.value }));
                                setState((pre) => ({ ...pre, isExist: false }))
                            }} />
                        </div>
                        {state.isExist && <p className={styles.isExist}>Username already exist</p>}
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_lock}`}></i>
                            <input type="password" placeholder="Password" value={input.RegPassword} onChange={(e) => setInput((pre) => ({ ...pre, RegPassword: e.target.value }))} />
                        </div>
                        <input type="submit" className={styles.btn} value="Sign up" />
                    </form>
                </div>
            </div>

            <div className={styles.panels_container}>
                <div className={`${styles.panel} ${styles.left_panel}`}>
                    <div className={styles.content}>
                        <h1>New Player Here ?</h1>
                        <p>
                            Are you a new player ? No problem i will save your details in my Database. Just click on below Sign Up button.
                        </p>
                        <button onClick={handleSignupClick} className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src="/images/LoginDora.png" className={styles.image} />
                </div>
                <div className={`${styles.panel} ${styles.right_panel}`}>
                    <div className={styles.content}>
                        <h1>Already Signed Up ?</h1>
                        <p>
                            Are you already our player ? Then why are you registering yourself again. Just login with your credentails and enjoy the game.
                        </p>
                        <button onClick={handleSigninClick} className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src="/images/SignupDora.png" className={styles.image} />
                </div>
            </div>
            {state.confTrue && <ConfettiExplosion particleCount={400} zIndex={10} width={3000} />}
        </div>

    </>;
}

export default Login_signup;
