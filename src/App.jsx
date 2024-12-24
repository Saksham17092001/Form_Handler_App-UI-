import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element= {<LandingPage/>}/>
    <Route path='/register' element= {<Register/>}/>
    <Route path='/login' element= {<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
