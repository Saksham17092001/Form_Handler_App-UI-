import React, { useState, useEffect } from 'react';
import { getWorkspaceData, createFolder, deleteFolder } from '../../services/server';
import styles from './Dashboard.module.css';
import CreateModal from '../../Modals/CreateModal/CreateModal';
import DeleteModal from '../../Modals/DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom'; // For navigation
import deleteImg from '../../assets/delete.png';
import createImg from '../../assets/create.png';
import arrowDown from '../../assets/arrowdown.png';
import arrowUp from '../../assets/arrowup.png';

const Dashboard = () => {
    const [folders, setFolders] = useState([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // Toggle for dropdown menu
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchWorkspaceData = async () => {
        try {
            const data = await getWorkspaceData();
            setFolders(data.folders);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        try {
            await createFolder({ name: newFolderName });
            setNewFolderName('');
            setShowCreateModal(false);
            fetchWorkspaceData();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDeleteFolder = async () => {
        try {
            await deleteFolder(folderToDelete);
            setFolderToDelete(null);
            setShowDeleteModal(false);
            fetchWorkspaceData();
        } catch (error) {
            console.error(error.message);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login
    };

    useEffect(() => {
        fetchWorkspaceData();
    }, []);

    return (
        <div className={`${styles.dashboard} ${darkMode ? styles.dark : styles.light}`}>
            <div className={styles.header}>
                <div className={styles.left}></div>
                <div className={styles.workspace}>
                    <span
                        className={styles.workspaceTitle}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {user.name}'s Workspace
                        <img
                            src={showDropdown ? arrowUp : arrowDown}
                            alt="Toggle dropdown"
                            className={styles.arrowIcon}
                        />
                    </span>
                    {showDropdown && (
                        <div className={styles.dropdown}>
                            <button
                                className={styles.dropdownItem}
                                onClick={() => navigate('/settings')}
                            >
                                Settings
                            </button>
                            <button className={styles.dropdownItem} onClick={handleLogout}>
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.right}>
                    <button onClick={toggleDarkMode} className={styles.toggleButton}>
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button className={styles.shareBtn}>Share</button>
                </div>
            </div>
            <div className={styles.createFolder}>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className={styles.createButton}
                >
                    <img src={createImg} alt="Create folder" />
                    Create a folder
                </button>
                <div className={styles.folderContainer}>
                    {folders.map((folder) => (
                        <div key={folder._id} className={styles.folderCard}>
                            <p>{folder.name}</p>
                            <button
                                className={styles.deleteButton}
                                onClick={() => {
                                    setFolderToDelete(folder._id);
                                    setShowDeleteModal(true);
                                }}
                            >
                                <img src={deleteImg} alt="Delete" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <CreateModal
                isVisible={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateFolder}
                folderName={newFolderName}
                setFolderName={setNewFolderName}
            />
            <DeleteModal
                isVisible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteFolder}
            />
        </div>
    );
};

export default Dashboard;
