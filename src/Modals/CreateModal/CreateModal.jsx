import React from 'react';
import styles from './CreateModal.module.css';

const CreateModal = ({ isVisible, onClose, onCreate, folderName, setFolderName }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Create New Folder</h2>
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Enter folder name"
                />
                <div className={styles.actions}>
                    <button onClick={onCreate} className={styles.confirmButton}>Done</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;