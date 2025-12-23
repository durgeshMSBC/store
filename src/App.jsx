import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import './App.scss'
import './index.scss'
import Collections from './pages/Collections'

function App() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' })
    // refresh AOS on load to ensure layout-based animations initialize
    window.addEventListener('load', AOS.refresh)
    return () => window.removeEventListener('load', AOS.refresh)
  }, [])
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App