import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Setting from './Components/Setting/Setting'
import FormEditor from './Components/FormEditor/FormEditor'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element= {<LandingPage/>}/>
    <Route path='/register' element= {<Register/>}/>
    <Route path='/login' element= {<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path ='/settings' element={<Setting/>}/>
    <Route path="/form/new" element={<FormEditor />} />
    <Route path="/form/:formId" element={<FormEditor />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
