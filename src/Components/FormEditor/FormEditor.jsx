import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createForm, updateForm } from '../../services/server';
import styles from './FormEditor.module.css';
import ShareModal from '../../Modals/ShareModal/ShareModal';

const FormEditor = () => {
    const [formName, setFormName] = useState('');
    const [formBody, setFormBody] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const navigate = useNavigate();
    const { folderId } = useParams();

    const handleSave = async () => {
        if (!formName.trim()) {
            alert('Please enter a form name');
            return;
        }

        try {
            const formData = {
                name: formName,
                body: formBody,
                folderId: folderId || null
            };
            
            await createForm(formData);
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving form:', error);
            alert('Error saving form');
        }
    };

    const addElement = (type) => {
        const newElement = {
            id: Date.now(),
            type,
            content: '',
            options: {}
        };

        setFormBody([...formBody, newElement]);
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    return (
        <div className={styles.formEditor}>
            <div className={styles.header}>
                <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Form name"
                    className={styles.formNameInput}
                />
                <div className={styles.actions}>
                    <button 
                        onClick={handleSave}
                        className={styles.saveBtn}
                    >
                        Save
                    </button>
                    <button 
                        onClick={handleShare}
                        className={styles.shareBtn}
                        disabled={!isSaved}
                    >
                        Share
                    </button>
                </div>
            </div>
            <div className={styles.editorContent}>
                <div className={styles.sidebar}>
                    <div className={styles.section}>
                        <h3>Bubble</h3>
                        <button onClick={() => addElement('image')}>Image</button>
                        <button onClick={() => addElement('gif')}>GIF</button>
                    </div>
                    <div className={styles.section}>
                        <h3>Input</h3>
                        <button onClick={() => addElement('text')}>Text</button>
                        <button onClick={() => addElement('number')}>Number</button>
                        <button onClick={() => addElement('email')}>Email</button>
                        <button onClick={() => addElement('date')}>Date</button>
                    </div>
                </div>
                <div className={styles.canvas}>
                    {formBody.map((element) => (
                        <FormElement
                            key={element.id}
                            element={element}
                            onUpdate={(updatedElement) => {
                                const updatedBody = formBody.map(el => 
                                    el.id === updatedElement.id ? updatedElement : el
                                );
                                setFormBody(updatedBody);
                            }}
                            onDelete={(elementId) => {
                                setFormBody(formBody.filter(el => el.id !== elementId));
                            }}
                        />
                    ))}
                </div>
            </div>
            {showShareModal && (
                <ShareModal
                    onClose={() => setShowShareModal(false)}
                   
                />
            )}
        </div>
    );
};

export default FormEditor;