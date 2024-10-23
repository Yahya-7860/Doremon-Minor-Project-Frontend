/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from '../CSS Folder/navabar.module.css'
import { FaUserCircle } from "react-icons/fa";
import LeaderBoardModal from "../modal/LeaderBoardModal";
import UserAccountModal from "../modal/UserAccountModal";

function Navbar({ game, isGameOver, startGame, endGame }) {
    const [isOpen, setIsOpen] = useState({
        leaderboard: false,
        profile: false
    });

    return <>
        <div className={styles.navbar_container}>
            <div className={styles.navbar_leftSection}>
                <div className={styles.start} >
                    <button className={styles.startBtn} onClick={game.displayStartBtn ? () => startGame() : () => endGame()}>{game.displayStartBtn ? "Start Game" : "End Game"}</button>
                </div>
                <div className={styles.score_board}>
                    <h1 className={styles.score}>Score: {game.gameScore}</h1>
                </div>
            </div>
            <div>
                <h2 className={styles.gameName}>Doremon Escape Game</h2>
                {isGameOver && <h1 className="end">Game Over</h1>}

            </div>
            <div className={styles.navbar_rightSection}>
                <div>
                    <button className={styles.max_scoreBox}>Your Max Score:0</button>
                </div>
                <div>
                    <button onClick={() => setIsOpen((pre) => ({ ...pre, leaderboard: true }))} className={styles.leaderboard}>Leader Board</button>
                </div>
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
