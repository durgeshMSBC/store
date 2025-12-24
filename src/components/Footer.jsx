import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer-modern">
      <Container className="container-modern">
        <Row className="footer-top" data-aos="fade-up">
          {/* Your Account */}
          <Col lg={2} md={4} sm={6} className="mb-4">
            <h5 className="footer-title">YOUR ACCOUNT</h5>
            <ul className="footer-list">
              <li><Link to="/products/running-shoes">Running Shoes</Link></li>
              <li><Link to="/products/football-shoes">Football Shoes</Link></li>
              <li><Link to="/products/basketball-shoes">Basketball Shoes</Link></li>
              <li><Link to="/products/workout-shoes">Workout Shoes</Link></li>
              <li><Link to="/products/trainer-shoes">Trainer Shoes</Link></li>
            </ul>
          </Col>
          
          {/* Information */}
          <Col lg={2} md={4} sm={6} className="mb-4">
            <h5 className="footer-title">INFORMATION</h5>
            <ul className="footer-list">
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/search-terms">Search Terms</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </Col>
          
          {/* Quick Links */}
          <Col lg={2} md={4} sm={6} className="mb-4">
            <h5 className="footer-title">QUICK LINKS</h5>
            <ul className="footer-list">
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/credit-slips">My Credit Slips</Link></li>
              <li><Link to="/bounty">Bounty</Link></li>
              <li><Link to="/addresses">My Addresses</Link></li>
              <li><Link to="/personal-info">My Personal Info</Link></li>
            </ul>
          </Col>
          
          {/* Footer Links */}
          <Col lg={2} md={4} sm={6} className="mb-4">
            <h5 className="footer-title">FOOTER LINKS</h5>
            <ul className="footer-list">
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/type">Type</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/website">Website</Link></li>
            </ul>
          </Col>
          
          {/* Services */}
          <Col lg={2} md={4} sm={6} className="mb-4">
            <h5 className="footer-title">SERVICES</h5>
            <ul className="footer-list">
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/type">Type</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/website">Website</Link></li>
            </ul>
          </Col>
          
          {/* Happy Hours */} 
          <Col lg={2} md={4} sm={6} className="mb-4">
            <h5 className="footer-title">HAPPY HOURS</h5>
            <div className="happy-hours">
              <p>Monday - Friday</p>
              <p className="hours">8am - 10pm</p>
              <p>Saturday & Sunday</p>
              <p className="hours">10am - 8pm</p>
            </div>
            
            <div className="social-icons mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaYoutube />
              </a>
            </div>
          </Col>
        </Row>
        
        {/* Contact Info */}
        <Row className="footer-contact py-4">
          <Col md={4} className="mb-3">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <h6>Phone</h6>
                <p>+91 9460092903</p>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h6>Email</h6>
                <p>support@nozstreetstyle.com</p>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h6>Address</h6>
                <p>123 Fashion Street, New York</p>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Footer Bottom */}
        <div className="footer-bottom text-center py-4 border-top">
          <p className="mb-2">&copy; {new Date().getFullYear()} SHOES AHMEDABAD All rights reserved.</p>
          <p className="epsilon-address mb-0">Epsilon Address</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer