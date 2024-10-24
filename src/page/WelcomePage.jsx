import React from "react";
import styles from "../CSS Folder/welcomePage.module.css"
import { useNavigate } from "react-router-dom";

function WelcomePage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/game')
    }

    return <>
        <div className={styles.main_container}>
            <div className={styles.text_box}>
                <div className={styles.textDiv}>
                    <h1 className={styles.welcomeText}>Welcome to Doremon Escape Game</h1>
                    <button onClick={handleClick} className={styles.welcomeBtn}>Let's Play</button>
                </div>
            </div>
        </div>

    </>;
}

export default WelcomePage;
