import React, { useState } from 'react';
import styles from '../CSS Folder/deleteConfirmationModal.module.css';
import { AiOutlineWarning } from 'react-icons/ai'; // For caution logo
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading"
import { handleDelete } from '../services/handleDelete';

const DeleteConfirmationModal = ({ setState }) => {
    const [state1, setState1] = useState({
        isLoading: false
    });

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
                <div className={styles.cautionLogo}>
                    <AiOutlineWarning size={80} color="red" />
                </div>
                <div className={styles.modalText}>
                    <h2>Are you sure?</h2>
                    <p>This action will permanently delete your account.</p>
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.confirmButton} onClick={() => handleDelete({ setState1, token, userId }, navigate)} >Yes</button>
                    <button className={styles.cancelButton} onClick={() => setState((pre) => ({ ...pre, isOpen: false }))}>No</button>
                </div>
            </div>
            {state1.isLoading && <Loading />}
        </div>
    );
};

export default DeleteConfirmationModal;
