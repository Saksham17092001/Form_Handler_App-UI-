import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ isVisible, onClose, onDelete }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Are you sure you want to delete this folder?</h2>
                <div className={styles.actions}>
                    <button onClick={onDelete} className={styles.confirmButton}>Confirm</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;