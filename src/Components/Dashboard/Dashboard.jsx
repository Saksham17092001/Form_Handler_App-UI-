import React, { useState, useEffect } from 'react';
import { getWorkspaceData, createFolder, deleteFolder } from '../../services/server';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [folders, setFolders] = useState([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

    // Fetch workspace data
    const fetchWorkspaceData = async () => {
        try {
            const data = await getWorkspaceData();
            setFolders(data.folders);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Create a new folder
    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        try {
            await createFolder({ name: newFolderName });
            setNewFolderName('');
            fetchWorkspaceData();
        } catch (error) {
            console.error(error.message);
        }
    };

    // Delete a folder
    const handleDeleteFolder = async (folderId) => {
        try {
            await deleteFolder(folderId);
            fetchWorkspaceData();
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchWorkspaceData();
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <div className={`${styles.dashboard} ${darkMode ? styles.dark : styles.light}`}>
            <div className={styles.header}>
                <span className={styles.workspace}>{user.name}'s Workspace</span>
                <button onClick={toggleDarkMode} className={styles.toggleButton}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div className={styles.createFolder}>
                <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name"
                />
                <button onClick={handleCreateFolder}>Create Folder</button>
            </div>
            <div className={styles.folderContainer}>
                {folders.map((folder) => (
                    <div key={folder._id} className={styles.folderCard}>
                        <h3>{folder.name}</h3>
                        <p>{folder.forms.length} Forms</p>
                        <button 
                            onClick={() => handleDeleteFolder(folder._id)} 
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
