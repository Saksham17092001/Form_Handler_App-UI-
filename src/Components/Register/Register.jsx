import React, { useState } from "react";
import { register } from '../../services/server'// Adjust path if necessary
import styles from "./Register.module.css"; 
import { Link, useNavigate } from "react-router-dom";
import back from '../../assets/arrow_back.png'
import googleImg from '../../assets/google.png'

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("enter same password in both fields");
      return;
    }

    setError(""); // Clear error if passwords match
    
    const data = { name, email, password, confirmPassword };

    try {
      const response = await register(data);
      if (response.ok) {
        alert("Registration successful");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong, please try again later.");
    }
  };
  const handleBack = ()=>{
    navigate(-1)
  }
  

  return (
    <div className={styles.registerContainer}>
    <button className={styles.back}><img src ={back} onClick={handleBack}/></button>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter a username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <div className={styles.errorMessage}>
        {error && <p >{error}</p>}
        </div>
        </div>
        
        <button type="submit" className={styles.submitButton}>Sign Up</button>
        <h6>OR</h6>
        <button className={styles.googleButton}><img src={googleImg}/>Sign in with Google</button>
        <div className={styles.add}><span>Already have an account?</span>
        <Link to = '/login' style={{color : "blue" , textDecoration :"none"}}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
