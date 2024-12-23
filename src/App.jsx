import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element= {<LandingPage/>}/>
    <Route path='/register' element= {<Register/>}/>
    <Route path='/login' element= {<Login/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
