import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar, FaWhatsapp } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import Services from '../components/Services'
import './Home.scss'
import hero1 from '../assets/nike-1.webp'
import hero2 from '../assets/nike-2.webp'
import { useCart } from '../contexts/CartContext'
import { products as productsData } from '../data/Products'

const Home = () => {
  const [newProducts, setNewProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showQuickView, setShowQuickView] = useState(false)
   const [selectedProduct, setSelectedProduct] = useState(null)


  useEffect(() => {
    // Use central products data and simulate a short loading delay
    setTimeout(() => {
      const featured = productsData.filter(p => p.featured || p.isNew).slice(0, 3)
      setNewProducts(featured)
      setLoading(false)
    }, 500)
  }, [])

  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
    // Show notification
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: `${product.name} added to cart!`
      }
    })
    window.dispatchEvent(event)
  }

  const handleQuickView = product => {
    setSelectedProduct(product)
    setShowQuickView(true)
  }

  return (
    <div className="home-page-modern">
      {/* Hero Section */}
      <section className="hero-section-modern">
        <Container className="container-modern">
          <Row className="align-items-center min-vh-80">
            <Col lg={6} className="hero-content">
              <div className="hero-badge" data-aos="fade-right">NEW COLLECTION</div>
              <h1 className="hero-title" data-aos="fade-up">
                STREETSTYLE
                <br />
                <span className="hero-subtitle">SELECT YOUR STYLE</span>
              </h1>
              <p className="hero-description" data-aos="fade-up" data-aos-delay="120">
                Discover the perfect blend of comfort and urban fashion with our exclusive shoe collection.
                Premium quality meets modern design.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Button as={Link} to="/products" className="btn-hero-primary me-lg-3">
                  SEE MORE <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/collections" className="btn-hero-secondary">
                  VIEW MORE
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-image-col pt-3" data-aos="zoom-in" data-aos-delay="250">
              <div className="hero-image-wrapper">
                <img
                  src={hero2}
                  alt="StreetStyle Shoe Collection"
                  className="hero-main-image"
                />
                <div className="image-content">
                  <span className="image-label">PREMIUM QUALITY</span>
                  <h3>CLASSIC DESIGN</h3>
                  <p>Since 2018</p>
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
          <div className="section-header text-center mb-5" data-aos="fade-up">
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
                  <Col lg={4} md={6} className="mb-4" key={product.id} data-aos="fade-up">
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

            {/* ✅ QUICK VIEW MODAL */}
      <Modal
        show={showQuickView}
        onHide={() => setShowQuickView(false)}
        centered
        size="lg"
      >
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col md={6}>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="img-fluid"
                  />
                </Col>

                <Col md={6}>
                  <p className="text-muted">{selectedProduct.category}</p>

                  <h4 className="text-danger">
                    ${selectedProduct.price}
                    <span className="text-muted ms-2 text-decoration-line-through">
                      ${selectedProduct.originalPrice}
                    </span>
                  </h4>

                  <p>
                    High quality product with premium materials. Perfect for
                    daily use and modern style.
                  </p>

                  <Button
                    variant="dark"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>


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