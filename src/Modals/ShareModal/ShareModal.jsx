import React, { useState } from 'react';
import styles from './ShareModal.module.css';

 const ShareModal = ({ onClose }) => {
    const [email, setEmail] = useState('');

    const handleSendInvite = () => {
        // Implement email invitation logic
    };

    const handleCopyLink = () => {
        // Implement link copying logic
    };

    return (
        <div className={styles.shareModalOverlay}>
            <div className={styles.shareModal}>
                <div className={styles.modalHeader}>
                    <h2>Share Form</h2>
                    <button onClick={onClose}>×</button>
                </div>
                <div className={styles.modalContent}>
                    <div className={styles.section}>
                        <h3>Invite by Email</h3>
                        <div className={styles.emailInput}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                            />
                            <button onClick={handleSendInvite}>Send Invite</button>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3>Share Link</h3>
                        <button onClick={handleCopyLink}>Copy Link</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ShareModal;
