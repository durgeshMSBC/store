import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar, FaWhatsapp } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import Services from '../components/Services'
import './Home.scss'

const Home = () => {
  const [newProducts, setNewProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      const products = [
        {
          id: 1,
          name: "BISSELIZING BAGGED CANISTER VACUUM",
          category: "PURPLE.4122",
          price: 498.32,
          originalPrice: 599.99,
          discount: 17,
          image: "https://via.placeholder.com/300x250/333/FFFFFF?text=PREMIUM+SHOE",
          isNew: true
        },
        {
          id: 2,
          name: "BLACK & RECKEN LENZOIC 09-VOLT MAX",
          category: "LITHIUM-10V DRILL",
          price: 22.49,
          originalPrice: 34.99,
          discount: 36,
          image: "https://via.placeholder.com/300x250/666/FFFFFF?text=SPORTS+SHOE"
        },
        {
          id: 3,
          name: "ROSS OFFICE PRODUCTS RECEPTION",
          category: "BURTON NIEWS SPECTRE",
          price: 89.99,
          originalPrice: 120.00,
          discount: 25,
          image: "https://via.placeholder.com/300x250/444/FFFFFF?text=CASUAL+SHOE",
          isNew: true
        }
      ]
      setNewProducts(products)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product)
    // Show notification
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: `${product.name} added to cart!`
      }
    })
    window.dispatchEvent(event)
  }

  const handleQuickView = (product) => {
    console.log('Quick view:', product)
  }

  return (
    <div className="home-page-modern">
      {/* Hero Section */}
      <section className="hero-section-modern">
        <Container className="container-modern">
          <Row className="align-items-center min-vh-80">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">NEW COLLECTION</div>
              <h1 className="hero-title">
                STREETSTYLE
                <br />
                <span className="hero-subtitle">SELECT YOUR STYLE</span>
              </h1>
              <p className="hero-description">
                Discover the perfect blend of comfort and urban fashion with our exclusive shoe collection.
                Premium quality meets modern design.
              </p>
              <div className="hero-buttons">
                <Button as={Link} to="/products" className="btn-hero-primary me-3">
                  SEE MORE <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/collections" className="btn-hero-secondary">
                  VIEW MORE
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-image-col">
              <div className="hero-image-wrapper">
                <div className="hero-image-placeholder">
                  <div className="image-content">
                    <span className="image-label">PREMIUM QUALITY</span>
                    <h3>CLASSIC DESIGN</h3>
                    <p>Since 2018</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <Services />

      {/* New Products Section */}
      <section className="new-products-section">
        <Container className="container-modern">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">NEW PRODUCTS</h2>
            <p className="section-subtitle">
              Per sescala quarta decima et quinta decima. Ecoleno modo tepi, qui nutre radio viderbar pausen clar
            </p>
          </div>
          
          {loading ? (
            <div className="loading-grid">
              {[1, 2, 3].map(i => (
                <div key={i} className="product-card-skeleton"></div>
              ))}
            </div>
          ) : (
            <Row>
              {newProducts.map(product => (
                <Col lg={4} md={6} className="mb-4" key={product.id}>
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                  />
                </Col>
              ))}
            </Row>
          )}
          
          <div className="text-center mt-5">
            <Button as={Link} to="/products" className="btn-view-all">
              VIEW ALL PRODUCTS <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Collections Section */}
      <section className="collections-section">
        <Container className="container-modern">
          <h2 className="section-title text-center mb-4">CLASSICAL COLLECTIONS</h2>
          <p className="section-subtitle text-center mb-5">CASUAL SHOES</p>
          
          <Row className="g-4">
            <Col lg={6}>
              <div className="collection-card classic-collection">
                <div className="collection-overlay"></div>
                <div className="collection-content">
                  <h3>CLASSIC COLLECTIONS</h3>
                  <p>Timeless designs for everyday comfort and style</p>
                  <Button as={Link} to="/collections" className="btn-collection">
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="collection-card casual-shoes">
                <div className="collection-overlay"></div>
                <div className="collection-content">
                  <h3>CASUAL SHOES</h3>
                  <p>Perfect for your relaxed and active lifestyle</p>
                  <Button as={Link} to="/collections" className="btn-collection">
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <Container className="container-modern">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">WHAT OUR CUSTOMERS SAY</h2>
          </div>
          
          <Row>
            {[1, 2, 3].map((_, i) => (
              <Col lg={4} md={6} key={i} className="mb-4">
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, j) => (
                      <FaStar key={j} className="star-icon" />
                    ))}
                  </div>
                  <p className="testimonial-text">
                    "Absolutely love my new shoes! Perfect fit and amazing quality. The WhatsApp ordering was super convenient!"
                  </p>
                  <div className="testimonial-author">
                    <strong>John D.</strong>
                    <span>Verified Customer</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* WhatsApp CTA */}
      <section className="whatsapp-cta-section">
        <Container className="container-modern">
          <div className="whatsapp-cta-card">
            <Row className="align-items-center">
              <Col lg={8}>
                <h3 className="cta-title">Order Directly on WhatsApp</h3>
                <p className="cta-text">
                  Get instant support, quick responses, and easy ordering via WhatsApp.
                  Just send us your cart items and we'll handle everything!
                </p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Button 
                  as="a" 
                  href="https://wa.me/9460092903"
                  target="_blank"
                  className="btn-whatsapp-cta"
                >
                  <FaWhatsapp className="me-2" />
                  Order on WhatsApp
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <Container className="container-modern">
          <div className="newsletter-card">
            <Row className="align-items-center">
              <Col lg={6}>
                <h2 className="newsletter-title">SUBSCRIBE</h2>
                <p className="newsletter-text">
                  Subscribe to our newsletter for exclusive offers, new arrivals, and style tips
                </p>
              </Col>
              <Col lg={6}>
                <form className="newsletter-form">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter your email address"
                      required
                    />
                    <button type="submit" className="btn-newsletter">
                      SUBSCRIBE
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Home