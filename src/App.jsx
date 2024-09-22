import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <HashRouter>
      {/* <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav> */}
      <div style={{ fontFamily: 'Zain', fontSize: 24 }}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu/:outletName" element={<MenuPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
