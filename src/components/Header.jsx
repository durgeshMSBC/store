import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import {
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaWhatsapp
} from 'react-icons/fa'
import './Header.scss'
import { useCart } from '../contexts/CartContext'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartItems } = useCart()
  const cartCount = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 🔒 Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto'
  }, [isMobileMenuOpen])

  const handleSearch = () => {

  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`header-navbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <Container className="container-modern">
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="brand" data-aos="fade-down">
          <span className="brand-main">Shoes</span>
          <span className="brand-sub">AHMEDABAD</span>
        </Navbar.Brand>

        {/* Desktop Nav */}
        <Nav className="desktop-nav mx-auto">
          <Nav.Link as={NavLink} to="/" end className="nav-link-modern">HOME</Nav.Link>
          <Nav.Link as={NavLink} to="/about" className="nav-link-modern">ABOUT</Nav.Link>
          <Nav.Link as={NavLink} to="/collections" className="nav-link-modern">COLLECTIONS</Nav.Link>
          <Nav.Link as={NavLink} to="/products" className="nav-link-modern">PRODUCTS</Nav.Link>
          <Nav.Link as={NavLink} to="/contact" className="nav-link-modern">CONTACT</Nav.Link>
        </Nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Desktop Search */}
          <div className="search-container desktop-search">
            <Form onSubmit={handleSearch} className="search-form-modern">
              <Form.Control
                type="search"
                placeholder="Search shoes..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="search-btn">
                <FaSearch />
              </Button>
            </Form>
          </div>

          {/* Icons */}
          <div className="action-icons">
            {/* <Link to="/account" className="icon-link-modern">
              <FaUser />
              <span className="icon-label">Account</span>
            </Link> */}

            <Link to="/cart" className="icon-link-modern cart-icon">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
              <span className="icon-label">Cart</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </Container>

      {/* Mobile Search */}
      {showMobileSearch && (
        <div className="mobile-search-bar">
          <Form onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Nav className="mobile-nav">
          {['/', '/collections', '/products', '/about', '/contact'].map((path, i) => (
            <Nav.Link
              key={i}
              as={NavLink}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
            </Nav.Link>
          ))}
        </Nav>

        <div className="mobile-actions">
          <Button
            as="a"
            href="https://wa.me/9460092903"
            target="_blank"
            className="whatsapp-btn-mobile"
          >
            <FaWhatsapp className="me-2" />
            Order on WhatsApp
          </Button>
        </div>
      </div>
    </Navbar>
  )
}

export default Header
