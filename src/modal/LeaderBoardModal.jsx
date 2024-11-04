/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styles from "../CSS Folder/leaderboardModal.module.css"
import Loading from './Loading';
import { fetch_leaderboard_data } from '../services/fetch_leaderboard_data';

const LeaderBoardModal = ({ setIsOpen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch_leaderboard_data({ setIsLoading, setUsers })
    }, []);


    return (
        <div className={styles.modal_overlay} >
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
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className={styles.close_btn} onClick={() => setIsOpen((pre) => ({ ...pre, leaderboard: false }))}>Close</button>
            </div>
            {isLoading && <Loading />}
        </div>
    );
};

export default LeaderBoardModal;
