/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from "../CSS Folder/userAccountModal.module.css"
import { FaUserCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteConfirmationModal from './DeleteConfirmationModal';


const UserAccountModal = ({ setIsOpen }) => {
    const playerName = useSelector((state) => state.score.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        isOpen: false,
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/')
        toast.success("Logged Out")
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
                    <button className={styles.delete_btn} onClick={() => setState((pre) => ({ ...pre, isOpen: true }))}>Delete Account</button>
                </div>
            </div>
            {state.isOpen && <DeleteConfirmationModal {...{ setState }} />}

        </div>
    );
};

export default UserAccountModal;
