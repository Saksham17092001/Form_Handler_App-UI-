import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createForm } from "../../services/server";
import styles from "./FormEditor.module.css";
import ShareModal from "../../Modals/ShareModal/ShareModal";
import closeImg from "../../assets/close.png";
import textImg from "../../assets/text.png";
import Img from '../../assets/image.png';
import videImg from '../../assets/vid.png';
import gifImg from '../../assets/gif.png';
import text2Img from '../../assets/text2.png'
import numImg from '../../assets/num.png';
import emaImg from '../../assets/email.png';
import phImg from '../../assets/phone.png';
import dateImg from '../../assets/date.png';
import rateImg from '../../assets/star.png';
import buttImg from '../../assets/buttons.png';


const FormEditor = () => {
  const [activeTab, setActiveTab] = useState("Flow"); // To toggle between "Flow" and "Response"
  const [formName, setFormName] = useState("");
  const [formBody, setFormBody] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();
  const { folderId } = useParams();

  const handleSave = async () => {
    if (!formName.trim()) {
      alert("Please enter a form name");
      return;
    }

    try {
      const formData = {
        name: formName,
        body: formBody,
        folderId: folderId || null,
      };
      await createForm(formData);
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Error saving form");
    }
  };
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      content: "",
      options: {},
    };

    setFormBody([...formBody, newElement]);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <div
      className={`${styles.formEditor} ${
        darkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.header}>
        <input
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Enter form name"
          className={styles.formNameInput}
        />
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "Flow" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("Flow")}
          >
            Flow
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "Response" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("Response")}
          >
            Response
          </button>
        </div>

        <div className={styles.actions}>
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
          <button
            onClick={handleShare}
            className={styles.shareBtn}
            disabled={!isSaved}
          >
            Share
          </button>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
          <button className={styles.closeButton} onClick={()=> navigate(-1)}>
            <img src={closeImg} />
          </button>
        </div>
      </div>

      {activeTab === "Flow" && (
        <div className={styles.responseTab}>
          <div className={styles.editorContent}>
            <div className={styles.sidebar}>
            <h6>Bubbles</h6>
              <div className={styles.section}>
                <button onClick={() => addElement("text")}><img src={textImg}/>Text</button>
                <button onClick={() => addElement("image")}><img src={Img}/>Image</button>
                <button onClick={() => addElement("video")}><img src={videImg}/>Video</button>
                <button onClick={() => addElement("gif")}><img src={gifImg}/>GIF</button>
              </div>
              <h6>Inputs</h6>
              <div className={styles.section}>
                <button onClick={() => addElement("text")}><img src={text2Img}/>Text</button>
                <button onClick={() => addElement("number")}><img src={numImg}/>Number</button>
                <button onClick={() => addElement("email")}><img src={emaImg}/>Email</button>
                <button><img src={phImg}/>Phone</button>
                <button onClick={() => addElement("date")}><img src={dateImg}/>Date</button>
                <button onClick={() => addElement("rating")}><img src={rateImg}/>Rating</button>
                <button><img src={buttImg}/>Buttons</button>
              </div>
            </div>
            <div className={styles.canvas}>
              {formBody.map((element) => (
                <div key={element.id} className={styles.formElement}>
                  {element.type.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default FormEditor;
