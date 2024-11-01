/* eslint-disable react/prop-types */
import React from 'react';
import styles from "../CSS Folder/userAccountModal.module.css"
import { InfinitySpin } from 'react-loader-spinner'


const Loading = () => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content_loading}>
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
                <h2>Loading...</h2>
            </div>
        </div>
    );
};

export default Loading;
