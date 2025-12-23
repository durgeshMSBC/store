import { useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaArrowRight, FaFilter, FaSearch } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import './Collections.scss'
import { products as productsData } from '../data/Products'
import { useCart } from '../contexts/CartContext'

const Collections = () => {
  const [activeCollection, setActiveCollection] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  
  // derive collections dynamically from central products data
  const categoryMap = productsData.reduce((acc, p) => {
    const key = (p.category || 'uncategorized').toString().toLowerCase()
    if (!acc[key]) acc[key] = { id: key, name: (p.category || 'Uncategorized'), count: 0, image: p.image }
    acc[key].count += 1
    if (!acc[key].image && p.image) acc[key].image = p.image
    return acc
  }, {})

  const collections = [
    { id: 'all', name: 'All Collections', description: 'Browse all products', image: '', count: productsData.length },
    ...Object.values(categoryMap)
  ]

  // use central products list for collection products
  const products = productsData

  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
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

  const filteredProducts = activeCollection === 'all' 
    ? products 
    : products.filter(p => p.collection === activeCollection)

  return (
    <div className="collections-page-modern">
      <Container className="container-modern">
        {/* Collections Grid */}
        <section className="collections-grid-section">
          <div className="section-header">
            <h2 className="section-title">BROWSE COLLECTIONS</h2>
            <p className="section-subtitle">
              Select a collection to explore our carefully curated products
            </p>
          </div>

          <Row className="g-4">
            {collections.map(collection => (
              <Col lg={4} md={6} key={collection.id}>
                <div 
                  className={`collection-card-modern ${activeCollection === collection.id ? 'active' : ''}`}
                  onClick={() => setActiveCollection(collection.id)}
                  data-aos="fade-up"
                >
                  <div 
                    className="collection-image"
                    style={{ backgroundImage: `url(${collection.image})` }}
                  >
                    <div className="collection-overlay"></div>
                    <div className="collection-count">
                      <FaShoppingBag className="me-2" />
                      {collection.count} Items
                    </div>
                  </div>
                  <div className="collection-content">
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                    <Button 
                      as={Link} 
                      to={`/collections/${collection.id}`}
                      className="btn-explore"
                    >
                      Explore Collection <FaArrowRight className="ms-2" />
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Products Section */}
        <section className="collection-products-section">
          <div className="section-header">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="section-title">
                  {activeCollection === 'all' ? 'ALL PRODUCTS' : 
                   collections.find(c => c.id === activeCollection)?.name.toUpperCase()}
                </h2>
                <p className="section-subtitle mb-0">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              <div className="filter-controls">
                <div className="filter-group">
                  <FaFilter className="filter-icon" />
                  <select 
                    className="filter-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products text-center py-5">
              <div className="no-products-icon">
                👟
              </div>
              <h3>No products found in this collection</h3>
              <p>Try selecting a different collection</p>
            </div>
          ) : (
            <Row className="mt-4">
              {filteredProducts.map(product => (
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
        </section>

        {/* Featured Collection */}
        <section className="featured-collection-section">
          <div className="featured-collection-card">
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="featured-content">
                  <h2 className="featured-title">FEATURED COLLECTION</h2>
                  <h3 className="featured-name">CLASSIC COLLECTIONS</h3>
                  <p className="featured-description">
                    Discover timeless designs that never go out of style. Our classic collection 
                    features premium materials and craftsmanship for enduring comfort and elegance.
                  </p>
                  <Button as={Link} to="/collections/classic" className="btn-featured">
                    SHOP CLASSIC COLLECTION
                  </Button>
                </div>
              </Col>
              <Col lg={6}>
                <div className="featured-image-wrapper">
                  <div 
                    className="featured-image"
                    style={{ backgroundImage: `url(https://via.placeholder.com/600x400/333/FFFFFF?text=CLASSIC+COLLECTION)` }}
                  >
                    <div className="featured-badge">
                      <span>FEATURED</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section className="collections-cta-section">
          <div className="cta-content text-center">
            <h2 className="cta-title">CAN'T FIND WHAT YOU'RE LOOKING FOR?</h2>
            <p className="cta-text">
              Contact our style consultants for personalized recommendations
            </p>
            <div className="cta-buttons">
              <Button as={Link} to="/contact" className="btn-cta-primary me-3">
                Contact Us
              </Button>
              <Button 
                as="a" 
                href="https://wa.me/9460092903"
                target="_blank"
                className="btn-cta-whatsapp"
              >
                WhatsApp Consultation
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Collections