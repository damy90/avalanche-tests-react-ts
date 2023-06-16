import { useState } from 'react'
import './assets/App.css'
import Home from './pages/Home'
import NavBar from './common/NavBar'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm'


function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/log-in" element={<LoginForm />}/>
      </Routes>
      
    </>
    
  )
}

export default App
