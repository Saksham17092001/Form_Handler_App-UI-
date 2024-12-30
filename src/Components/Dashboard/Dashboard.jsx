import React, { useState, useEffect } from "react";
import {
  getWorkspaceData,
  createFolder,
  deleteFolder,
  getForms,
  deleteForm,
} from "../../services/server";
import styles from "./Dashboard.module.css";
import CreateModal from "../../Modals/CreateModal/CreateModal";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import DeleteFormModal from "../../Modals/DeleteForm/DeleteForm";
import ShareModal from "../../Modals/ShareModal/ShareModal";
import { useNavigate } from "react-router-dom";
import deleteImg from "../../assets/delete.png";
import createImg from "../../assets/create.png";
import arrowDown from "../../assets/arrowdown.png";
import arrowUp from "../../assets/arrowup.png";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [formToDelete, setFormToDelete] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchWorkspaceData = async () => {
    try {
      const [folderData, formData] = await Promise.all([
        getWorkspaceData(),
        getForms(),
      ]);
      setFolders(folderData.folders);
      setForms(formData.forms);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      await createFolder({ name: newFolderName });
      setNewFolderName("");
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

  const handleDeleteForm = async () => {
    try {
      await deleteForm(formToDelete);
      setFormToDelete(null);
      setShowFormModal(false);
      fetchWorkspaceData();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  return (
    <div
      className={`${styles.dashboard} ${darkMode ? styles.dark : styles.light}`}
    >
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
                onClick={() => navigate("/settings")}
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
          <span className={styles.modeLabel}>Dark</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={!darkMode}
              onChange={toggleDarkMode}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.modeLabel}>Light</span>
        </div>
        <div className={styles.extRight}><button className={styles.shareBtn}>Share</button></div>
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

      <div className={styles.formSection}>
        <button
          onClick={() => navigate("/form/new")}
          className={styles.formBtn}
        >
          <h2> +</h2>
          <h6>Create a typebot</h6>
        </button>
        <div className={styles.formGrid}>
          {forms.map((form) => (
            <div key={form._id} className={styles.formCard}>
              <div className={styles.formHeader}>
                <h6 onClick={() => navigate(`/form/${form._id}`)}>
                  {form.name}
                </h6>
              </div>
              <button
                className={styles.formDeleteButton}
                onClick={() => {
                  setShowFormModal(true);
                  setFormToDelete(form._id);
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

      <DeleteFormModal
        isVisible={showFormModal}
        onClose={() => setShowFormModal(false)}
        onDelete={handleDeleteForm}
      />

      {showShareModal && (
        <ShareModal
          isVisible={showShareModal}
          onClose={() => {
            setShowShareModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
