import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import MenuPage from './pages/MenuPage';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Scrolls to top on route change

  return null;
}

function App() {
  return (
    <div style={{ fontFamily: 'Zain', fontSize: 24 }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu/:outletName" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function Root() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default Root;
