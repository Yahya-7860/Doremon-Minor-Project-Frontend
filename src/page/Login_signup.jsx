import React, { useRef } from "react";
import styles from "../CSS Folder/login_signup.module.css"

function Login_signup() {
    const containerRef = useRef(null)
    const handleSignupClick = () => {
        containerRef.current.classList.add(styles.sign_up_mode);
    };

    const handleSigninClick = () => {
        containerRef.current.classList.remove(styles.sign_up_mode);
    };
    return <>
        <div ref={containerRef} className={styles.container}>
            <div className={styles.forms_container}>
                <div className={styles.signin_signup}>
                    <form className={styles.sign_in_form}>
                        <h2 className={styles.title}>Sign in</h2>
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_user}`}></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_lock}`}></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
                    </form>
                    <form className={styles.sign_up_form}>
                        <h2 className={styles.title}>Sign up</h2>
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_user}`}></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className={styles.input_field}>
                            <i className={`${styles.fas} ${styles.fa_lock}`}></i>
                            <input type="password" placeholder="Password" />
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
        </div>

    </>;
}

export default Login_signup;
