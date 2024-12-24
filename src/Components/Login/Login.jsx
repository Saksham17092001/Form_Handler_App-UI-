import React, { useEffect, useState } from "react";
import { login } from '../../services/server' // Adjust path if necessary
import styles from "./Login.module.css"; // Assuming you create a Login.module.css for styling
import googleImg from '../../assets/google.png'
import { Link, useNavigate } from "react-router-dom";
import back from '../../assets/arrow_back.png'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if(localStorage.getItem('token')){
      alert('Already logged in')
      navigate('/dashboard')
    }
  },[])
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
      const response = await login(data);
      try{
      if (response.ok) {
        const result = await response.json();
        alert("Login successful");
        localStorage.setItem('token', result.token); // Store JWT token
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/dashboard'); // Redirect to dashboard
      } 
    }
    
     catch (err) {
      alert("Login error:", err.message);
    }
  
}

  const handleBack = ()=>{
    navigate(-1)
  }


  return (
    <>
    <div className={styles.loginContainer}>
      <button className={styles.back}><img src ={back} onClick={handleBack}/></button>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className={styles.submitButton}>Log In</button>
        <h6>OR</h6>
        <button className={styles.googleButton}><img src={googleImg}/>Sign in with Google</button>

        <div className={styles.add}><span>Don't have an account?</span><Link to = '/register' style={{color : "blue" , textDecoration :"none"}}>Register now</Link></div>
      
      </form>
    </div>
    </>
  );
};

export default Login;
