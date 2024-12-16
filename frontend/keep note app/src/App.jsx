import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<SignUp/>} />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
