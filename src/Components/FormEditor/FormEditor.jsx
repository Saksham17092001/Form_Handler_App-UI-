import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createForm } from "../../services/server";
import styles from "./FormEditor.module.css";
import closeImg from "../../assets/close.png";
import textImg from "../../assets/text.png";
import Img from "../../assets/image.png";
import videImg from "../../assets/vid.png";
import gifImg from "../../assets/gif.png";
import text2Img from "../../assets/text2.png";
import numImg from "../../assets/num.png";
import emaImg from "../../assets/email.png";
import phImg from "../../assets/phone.png";
import dateImg from "../../assets/date.png";
import rateImg from "../../assets/star.png";
import buttImg from "../../assets/buttons.png";

const FormEditor = () => {
  const [activeTab, setActiveTab] = useState("Flow"); // Toggle between "Flow" and "Response"
  const [formName, setFormName] = useState("");
  const [formBody, setFormBody] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
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
    const formLink = `${window.location.origin}/form/${folderId}`;
    navigator.clipboard.writeText(formLink);
    alert("Form link copied to clipboard!");
  };

  return (
    <div
      className={`${styles.formEditor} ${
        darkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.header}>
        {activeTab === "Flow" ? (
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Enter form name"
            className={styles.formNameInput}
          />
        ) : (
          <div className={styles.empty}></div>
        )}
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
          <button className={styles.closeButton} onClick={() => navigate(-1)}>
            <img src={closeImg} alt="Close" />
          </button>
        </div>
      </div>

      {activeTab === "Flow" && (
        <div className={styles.responseTab}>
          <div className={styles.editorContent}>
            <div className={styles.sidebar}>
              <h6>Bubbles</h6>
              <div className={styles.section}>
                <button onClick={() => addElement("text")}>
                  <img src={textImg} alt="Text" />
                  Text
                </button>
                <button onClick={() => addElement("image")}>
                  <img src={Img} alt="Image" />
                  Image
                </button>
                <button onClick={() => addElement("video")}>
                  <img src={videImg} alt="Video" />
                  Video
                </button>
                <button onClick={() => addElement("gif")}>
                  <img src={gifImg} alt="GIF" />
                  GIF
                </button>
              </div>
              <h6>Inputs</h6>
              <div className={styles.section}>
                <button onClick={() => addElement("text")}>
                  <img src={text2Img} alt="Text" />
                  Text
                </button>
                <button onClick={() => addElement("number")}>
                  <img src={numImg} alt="Number" />
                  Number
                </button>
                <button onClick={() => addElement("email")}>
                  <img src={emaImg} alt="Email" />
                  Email
                </button>
                <button>
                  <img src={phImg} alt="Phone" />
                  Phone
                </button>
                <button onClick={() => addElement("date")}>
                  <img src={dateImg} alt="Date" />
                  Date
                </button>
                <button onClick={() => addElement("rating")}>
                  <img src={rateImg} alt="Rating" />
                  Rating
                </button>
                <button>
                  <img src={buttImg} alt="Buttons" />
                  Buttons
                </button>
              </div>
            </div>
            <div className={styles.canvas}>
              {formBody.map((element) => (
                <div key={element.id} className={styles.formElement}>
                  {element.type === "text" && (
                    <input
                      type="text"
                      placeholder={element.placeholder || "Enter text"}
                    />
                  )}
                  {element.type === "number" && (
                    <input
                      type="number"
                      placeholder={element.placeholder || "Enter number"}
                    />
                  )}
                  {element.type === "email" && (
                    <input
                      type="email"
                      placeholder={element.placeholder || "Enter email"}
                    />
                  )}
                  {element.type === "phone" && (
                    <input
                      type="tel"
                      placeholder={element.placeholder || "Enter phone number"}
                    />
                  )}
                  {element.type === "date" && (
                    <input
                      type="date"
                      placeholder={element.placeholder || "Select date"}
                    />
                  )}
                  {element.type === "rating" && (
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  )}
                  {element.type === "buttons" && (
                    <div>
                      {element.options?.choices?.map((choice, index) => (
                        <button key={index}>{choice}</button>
                      ))}
                    </div>
                  )}
                  {element.type === "image" && (
                    <input type="file" accept="image/*" />
                  )}
                  {element.type === "video" && (
                    <input type="file" accept="video/*" />
                  )}
                  {element.type === "gif" && (
                    <input type="file" accept="image/gif" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Response" && (
        <div className={styles.responses}>
          <p>No Responses yet collected</p>
          <b>As the project was far beyond a fresher's level, </b>
          <b>and the training provided didn't align with the promised placement guarantee.</b>
        </div>
      )}
    </div>
  );
};

export default FormEditor;
