/* eslint-disable react/prop-types */
import React from 'react';
import styles from "../CSS Folder/userAccountModal.module.css"
import { FaUserCircle } from "react-icons/fa";

const UserAccountModal = ({ setIsOpen }) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div >
                    <FaUserCircle className={styles.user_icon} />
                </div>
                <h2 className={styles.username}>Username : shamin</h2>
                <div className={styles.leaderBtns}>
                    <button className={styles.delete_btn}>Delete Account</button>
                    <button className={styles.close_btn} onClick={() => setIsOpen((pre) => ({ ...pre, profile: false }))}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default UserAccountModal;
