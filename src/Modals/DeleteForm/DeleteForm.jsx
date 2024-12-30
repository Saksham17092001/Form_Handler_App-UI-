import React from 'react';
import styles from '../DeleteModal/DeleteModal.module.css'

const DeleteFormModal = ({ isVisible, onClose, onDelete }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Are you sure you want to delete this form?</h2>
                <div className={styles.actions}>
                    <button onClick={onDelete} className={styles.confirmButton}>Confirm</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteFormModal;