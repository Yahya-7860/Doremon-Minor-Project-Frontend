/* eslint-disable react/prop-types */
import React from 'react';
import styles from "../CSS Folder/userAccountModal.module.css"
import { FaUserCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeIsAuthenticated } from '../features/score/scoreSlice';


const UserAccountModal = ({ setIsOpen }) => {
    const playerName = useSelector((state) => state.score.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        dispatch(changeIsAuthenticated({ bool: false }));
        navigate('/')
    }
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.closeBtnContainer}>
                    <h1>Profile</h1>
                    <IoMdCloseCircle onClick={() => setIsOpen((pre) => ({ ...pre, profile: false }))} className={styles.closeBtn} />
                </div>
                <div >
                    <FaUserCircle className={styles.user_icon} />
                </div>
                <h2 className={styles.username}>Username : {playerName}</h2>
                <div className={styles.leaderBtns}>
                    <button className={styles.logout_btn} onClick={handleLogout}>Log Out</button>
                    <button className={styles.delete_btn}>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default UserAccountModal;
