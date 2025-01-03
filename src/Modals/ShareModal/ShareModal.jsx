import React, { useState } from 'react';
import styles from './ShareModal.module.css';
import { sendInvite, generateShareLink } from '../../services/server';
import closeImg from '../../assets/close.png';

const ShareModal = ({ isVisible, onClose, workspaceId }) => {
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('edit'); // Default to 'view'
    const [shareLink, setShareLink] = useState(''); // Add state for share link

    const handleSendInvite = async () => {
        if (!email) {
            alert('Please enter a valid email.');
            return;
        }
        try {
            await sendInvite({ email, permission, workspaceId });
            alert('Invite sent successfully!');
            setEmail(''); // Clear email field
        } catch (error) {
            console.error('Error sending invite:', error.message);
            alert('Failed to send invite.');
        }
    };

    const handleGenerateLink = async () => {
        try {
            const { link } = await generateShareLink({ permission, workspaceId });
            setShareLink(link); // Now, set the generated link to the state
            navigator.clipboard.writeText(link); // Automatically copy link to clipboard
            alert('Link copied to clipboard!');
        } catch (error) {
            console.error('Error generating share link:', error.message);
            alert('Failed to generate link.');
        }
    };

    if (!isVisible) return null;

    return (
        <div className={styles.shareModalOverlay}>
            <div className={styles.shareModal}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src={closeImg} alt="Close" />
                </button>
                <div className={styles.topSection}>
                    <p>Invite by Email</p>
                    <div className={styles.permissionDropdown}>
                        <select
                            value={permission}
                            onChange={(e) => setPermission(e.target.value)}
                            className={styles.permissionDropdown}
                        >
                            <option value="edit" className={styles.drop}>Edit</option>
                            <option value="view" className={styles.drop}>View</option>
                        </select>
                    </div>
                </div>

                <div className={styles.inviteSection}>
                    <input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.emailInput}
                    />
                    <button onClick={handleSendInvite} className={styles.inviteBtn}>
                        Send Invite
                    </button>
                </div>
                <div className={styles.linkSection}>
                    <p>Invite by Link</p>
                    <button onClick={handleGenerateLink} className={styles.inviteBtn}>
                        Copy Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
