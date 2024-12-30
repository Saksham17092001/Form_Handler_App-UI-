import React, { useState } from 'react';
import styles from './ShareModal.module.css';
import { sendInvite, generateShareLink } from '../../services/server';
import closeImg from '../../assets/close.png';

const ShareModal = ({ isVisible, onClose, workspaceId }) => {
    const [email, setEmail] = useState('');
    const [permission, setPermission] = useState('view'); // Default to 'view'
    const [shareLink, setShareLink] = useState('');

    const handleSendInvite = async () => {
        try {
            await sendInvite({ email, permission, workspaceId });
            alert('Invite sent successfully!');
        } catch (error) {
            console.error('Error sending invite:', error.message);
        }
    };

    const handleGenerateLink = async () => {
        try {
            const { link } = await generateShareLink({ permission, workspaceId });
            setShareLink(link);
        } catch (error) {
            console.error('Error generating share link:', error.message);
        }
    };

    if (!isVisible) return null;

    return (
        <div className={styles.shareModalOverlay}>
            <div className={styles.shareModal}>
                <button onClick={onClose} className={styles.closeButton}><img src={closeImg}/></button>
                <div className={styles.inviteSection}>
                    <p>Invite by Email</p>
                    <input
                        type="email"
                        placeholder="Enter email id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <select
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                    >
                        <option value="view">View</option>
                        <option value="edit">Edit</option>
                    </select> */}
                    <button onClick={handleSendInvite} className={styles.inviteBtn}>Send Invite</button>
                </div>
                <div className={styles.linkSection}>
                    <p>Invite by Link</p>
                    {/* <select
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                    >
                        <option value="view">View</option>
                        <option value="edit">Edit</option>
                    </select> */}
                    <button onClick={handleGenerateLink} className={styles.inviteBtn}>Copy Link</button>
                    {shareLink && <input type="text" readOnly value={shareLink} />}
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
