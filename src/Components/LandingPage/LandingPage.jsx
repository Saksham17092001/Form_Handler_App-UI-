import React from 'react'
import styles from './LandingPage.module.css'
import logoImg from '../../assets/logo.png'
import triangleImg from '../../assets/triangle.png'
import semiImg from '../../assets/semi.png'
import mainImg from '../../assets/main.png'
import arrImg from '../../assets/arrow.png'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate('/login')
  }
  const handleNavigate2 = ()=>{
    navigate('/register')
  }
  return (
    <div className={styles.app}>
    {/* Navbar */}
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}><img src={logoImg} className={styles.logoImg}></img>FormBot</div>
      <div className={styles.navbarLinks}>
        <button className={styles.signIn} onClick={handleNavigate}>Sign in</button>
        <button className={styles.createButton} onClick={handleNavigate2}>Create a FormBot</button>
      </div>
    </nav>

    {/* Main Section */}
    <main className={styles.mainSection}>
      <div><img src={triangleImg}/></div>
      <div className={styles.mainContent}>
        <h1>Build advanced chatbots visually</h1>
        <p>
          Typebot gives you powerful blocks to create unique chat experiences. Embed them anywhere on your web/mobile apps and start collecting results like magic.
        </p>
        <button className={styles.ctaButton} onClick={handleNavigate2}>Create a FormBot for free</button>
      </div>
      <div>
        <img src={semiImg}/>
      </div>
    </main>

    <div className={styles.imagePlaceholder}><img src={mainImg}/></div>

    {/* Footer */}
    <footer className={styles.footer}>
      <div className={styles.footerColumns}>
        <div>
        <h3><img src ={logoImg}/>FormBot</h3>
        <p>Made with ❤️ by <u>@cuvette</u></p>
        </div>

        <div>
          <h4>Product</h4>
          <p><u>Status</u><img src={arrImg} className={styles.arrImg}/></p>
          <p><u>Documentation</u><img src={arrImg} className={styles.arrImg}/></p>
          <p><u>Roadmap</u><img src={arrImg} className={styles.arrImg}/></p> 
          <p><u>Pricing</u></p>
        </div>

        <div>
          <h4>Community</h4>
          <p><u>Discord</u><img src={arrImg} className={styles.arrImg}/></p>
          <p><u>GitHub Repository</u><img src={arrImg} className={styles.arrImg}/></p>
          <p><u>Twitter</u><img src={arrImg} className={styles.arrImg}/></p>
          <p><u>LinkedIn</u><img src={arrImg} className={styles.arrImg}/></p>
          <p><u>OSS Friends</u></p>
        </div>

        <div>
          <h4>Company</h4>
          <p><u>About</u></p> 
          <p> <u>Contact</u></p>
          <p> <u>Terms of Service</u></p>
          <p><u>Privacy Policy</u></p> 
        </div>
        
      </div>
    </footer>
  </div>
  )
}

export default LandingPage