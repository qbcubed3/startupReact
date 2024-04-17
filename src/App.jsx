import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import './App.css'

import Header from './homepage/Header'
import Navlist from './homepage/Navlist'
import Footer from './homepage/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
        <BrowserRouter>
          <div className = "navigation">
            <NavLink className = 'navLink' to=''>
              Login
            </NavLink>
            <NavLink className = 'navLink' to='homepage'>
              Homepage
            </NavLink>
            <NavLink className = 'navLink' to='stats'>
              Stats
            </NavLink>
            <NavLink className = 'navLink' to='survey'>
              Survey
            </NavLink>
          </div>
        </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
