import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import './App.css'

import Header from './homepage/Header'
import Navlist from './homepage/Navlist'
import Footer from './homepage/Footer'
import { Homepage } from './homepage/homepage.jsx'
import {Main} from './main/main.jsx'
import {Stats} from './stats/stats.jsx'
import {Survey} from './survey/survey.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <div className = "content">
        <div className = "navigation">
          <div className = "navlist">
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
        </div>
          <div className = "routes">
          <Routes>
            <Route path='/' element={<Main/>} /> 
            <Route path='/stats' element={<Stats/>}/>
            <Route path='/survey' element={<Survey/>}/>
            <Route path='/homepage' element={<Homepage />} />
            </Routes>
          </div>
        </div>

        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
