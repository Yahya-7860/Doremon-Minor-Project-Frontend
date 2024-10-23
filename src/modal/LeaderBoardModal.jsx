/* eslint-disable react/prop-types */
import React from 'react';
import styles from "../CSS Folder/leaderboardModal.module.css"

const users = [
    {
        username: "shamin",
        score: 10
    },
    {
        username: "ansari",
        score: 20
    },
    {
        username: "yahya",
        score: 30
    },
]

const LeaderBoardModal = ({ setIsOpen }) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h2 className={styles.modal_title}>Leaderboard</h2>
                <table className={styles.leaderboard_table}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Rank starts from 1 */}
                                <td>{user.username}</td>
                                <td>{user.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className={styles.close_btn} onClick={() => setIsOpen((pre) => ({ ...pre, leaderboard: false }))}>Close</button>
            </div>
        </div>
    );
};

export default LeaderBoardModal;
