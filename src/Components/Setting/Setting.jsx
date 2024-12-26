import React, { useState } from 'react';
import { updateUser } from '../../services/server'; // API service for user update
import styles from './Setting.module.css';
import { useNavigate } from 'react-router-dom';
import delImg from '../../assets/del.png'
import userImg from '../../assets/user.png'
import lockImg from '../../assets/lock.png'

const Setting = () => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.id) {
        console.error("User data is missing or incomplete in localStorage.");
        alert("User data is invalid. Please log in again.");
        navigate('/login'); // Redirect to login if user data is invalid
        return null;
    }

    const [name, setName] = useState(''); // Initialize with empty string
    const [email, setEmail] = useState(''); // Initialize with empty string
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdate = async () => {
        if (!oldPassword.trim()) {
            alert('Old password is required!');
            return;
        }
        try {
            const response = await updateUser(user.id, {
                name: name.trim() || user.name,
                email: email.trim() || user.email,
                oldPassword,
                newPassword: newPassword.trim() || null,
            });
    
            if (response.success) {
                alert('User updated successfully!');
                // Update localStorage with new data
                localStorage.setItem('user', JSON.stringify({ ...user, name, email }));
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                alert(response.message || 'Update failed. Please try again.');
            }
        } catch (error) {
            console.error(error.message);
            alert('Error updating user information.');
        }
    };


    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <div className={styles.settings}>
            <h2>Settings</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Update Email"
            />
            <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                required
            />
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
            />
            <button onClick={handleUpdate} className={styles.settingBtn}>Update</button>
            <button onClick={handleLogout} className={styles.logoutBtn}><img src={delImg}/> Log out</button>
        </div>
    );
};

export default Setting;
