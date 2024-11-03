/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from '../CSS Folder/navabar.module.css'
import { FaUserCircle } from "react-icons/fa";
import LeaderBoardModal from "../modal/LeaderBoardModal";
import UserAccountModal from "../modal/UserAccountModal";
import { useSelector } from "react-redux";

function Navbar({ game, isGameOver, startGame, endGame }) {
    const currentScore = useSelector((state) => state.score.currentScore)
    const maxScore = useSelector((state) => state.score.maxScore)
    const [isOpen, setIsOpen] = useState({
        leaderboard: false,
        profile: false
    });

    return <>
        <div className={styles.navbar_container}>
            {/* start end button */}
            <div className={styles.navbar_leftSection}>
                <div className={styles.start} >
                    <button className={styles.startBtn} onClick={game.displayStartBtn ? () => startGame() : () => endGame()}>{game.displayStartBtn ? "Start Game" : "Quit Game"}</button>
                </div>
                {/* current score */}
                <div className={styles.score_board}>
                    <h1 className={styles.score}>Score : {currentScore}</h1>
                </div>
            </div>
            {/* heading */}
            <div>
                <h2 className={styles.gameName}>Doremon Escape Game</h2>
                {isGameOver && <h1 className="end">Game Over</h1>}

            </div>
            <div className={styles.navbar_rightSection}>
                {/* max score chart */}
                <div>
                    <button className={styles.max_scoreBox}>Your Max Score : {maxScore}</button>
                </div>
                {/* leaderboard button */}
                <div>
                    <button onClick={() => setIsOpen((pre) => ({ ...pre, leaderboard: true }))} className={styles.leaderboard}>Leader Board</button>
                </div>
                {/* profile button */}
                <div>
                    <FaUserCircle onClick={() => setIsOpen((pre) => ({ ...pre, profile: true }))} className={styles.userIcon} />
                </div>
            </div>

        </div>
        {isOpen.leaderboard && <LeaderBoardModal {...{ setIsOpen }} />}
        {isOpen.profile && <UserAccountModal {...{ setIsOpen }} />}

    </>;
}

export default Navbar;
