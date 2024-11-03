import React, { useState } from 'react';
import styles from '../CSS Folder/deleteConfirmationModal.module.css';
import { AiOutlineWarning } from 'react-icons/ai'; // For caution logo
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading"
import { toast } from 'react-toastify';

const DeleteConfirmationModal = ({ setState }) => {
    const [state1, setState1] = useState({
        isLoading: false
    });

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleDelete = async () => {
        setState1((pre) => ({ ...pre, isLoading: true }))

        const option = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
        //will delete account
        await fetch(`http://localhost:3000/player/delete?id=${userId}`, option)
            .then((res) => res.json())
            .then((data) => {
                setState1((pre) => ({ ...pre, isLoading: false }))
                toast.success("Account Deleted Successfully")
                navigate("/")
            })

        //will score chart related to account
        await fetch(`http://localhost:3000/score/deleteScore?id=${userId}`, option)
            .then((res) => res.json())
            .then((data) => console.log(data))

    }

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
                    <button className={styles.confirmButton} onClick={handleDelete} >Yes</button>
                    <button className={styles.cancelButton} onClick={() => setState((pre) => ({ ...pre, isOpen: false }))}>No</button>
                </div>
            </div>
            {state1.isLoading && <Loading />}
        </div>
    );
};

export default DeleteConfirmationModal;
