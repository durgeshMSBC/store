import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa'
import './Header.scss'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(3)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <Container>
          <div className="announcement-content">
            <span className="announcement-text">
              🚚 FREE SHIPPING on all orders over $2000 • 📞 Call +91 9460092903
            </span>
            <Button 
              as="a" 
              href="https://wa.me/9460092903"
              target="_blank"
              className="whatsapp-btn"
              variant="success"
              size="sm"
            >
              <FaWhatsapp className="me-2" />
              WhatsApp Order
            </Button>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`header-navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        <Container className="container-modern">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="brand">
            <span className="brand-main">N.O.Z</span>
            <span className="brand-sub">STREETSTYLE</span>
          </Navbar.Brand>

          {/* Desktop Navigation */}
          <Nav className="desktop-nav mx-auto">
            <Nav.Link as={NavLink} to="/" end className="nav-link-modern">HOME</Nav.Link>
            <Nav.Link as={NavLink} to="/collections" className="nav-link-modern">COLLECTIONS</Nav.Link>
            <Nav.Link as={NavLink} to="/products" className="nav-link-modern">PRODUCTS</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-modern">ABOUT</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="nav-link-modern">Contact Us</Nav.Link>
          </Nav>

          {/* Right Actions */}
          <div className="header-actions">
            {/* Search */}
            <div className={`search-container ${isMobileMenuOpen ? 'mobile-search' : ''}`}>
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
              <Link to="/account" className="icon-link-modern">
                <FaUser />
                <span className="icon-label">Account</span>
              </Link>
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

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <Nav className="mobile-nav">
              <Nav.Link as={NavLink} to="/" end onClick={() => setIsMobileMenuOpen(false)}>HOME</Nav.Link>
              <Nav.Link as={NavLink} to="/collections" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Nav.Link>
              <Nav.Link as={NavLink} to="/products" onClick={() => setIsMobileMenuOpen(false)}>PRODUCTS</Nav.Link>
              <Nav.Link as={NavLink} to="/pages" onClick={() => setIsMobileMenuOpen(false)}>PAGES</Nav.Link>
              <Nav.Link as={NavLink} to="/blog" onClick={() => setIsMobileMenuOpen(false)}>BLOG</Nav.Link>
              <Nav.Link as={NavLink} to="/about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Nav.Link>
            </Nav>
            <div className="mobile-actions">
              <Button 
                as="a" 
                href="https://wa.me/9460092903"
                target="_blank"
                className="whatsapp-btn-mobile"
                variant="success"
              >
                <FaWhatsapp className="me-2" />
                Order on WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header