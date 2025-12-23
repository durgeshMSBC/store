import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFilter, FaSort } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import './Products.scss'
import { useCart } from '../contexts/CartContext'
import { products as productsData } from '../data/Products'

const Products = () => {
  const [products] = useState(productsData)

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const types = ['All', 'Running', 'Casual', 'Basketball']

  useEffect(() => {
    let result = [...products]

    if (selectedType !== 'All') {
      result = result.filter(p => p.type === selectedType)
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    setFilteredProducts(result)
  }, [selectedType, sortBy, products])

  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
    console.log('Added to cart:', product)
  }

  const handleQuickView = (product) => {
    console.log('Quick view:', product)
  }

  return (
    <div className="products-page-modern">
      <Container className="container-modern">
        {/* HEADER */}
        <div className="page-header" data-aos="fade-up">
          <h1 className="page-title">OUR PRODUCTS</h1>
          <p className="page-subtitle">
            Discover our premium collection of shoes
          </p>
        </div>

        {/* FILTER & SORT */}
        <div className="filter-sort-bar">
          <div className="filter-section">
            <FaFilter className="filter-icon" />
            <span className="filter-label">Filter by</span>

            <div className="filter-buttons">
              {types.map(type => (
                <button
                  key={type}
                  className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-section">
            <FaSort className="sort-icon" />
            <span className="sort-label">Sort by</span>

            <Form.Select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </Form.Select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <Row className="products-grid-section">
          {filteredProducts.map(product => (
            <Col key={product.id} xl={4} lg={4} md={6} sm={12} className="mb-4" data-aos="fade-up">
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            </Col>
          ))}
        </Row>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="no-products text-center py-5">
            <h3>No products found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}

        {/* COLLECTIONS */}
        <div className="collections-banner">
          <Row>
            <Col md={6} sm={12} className="mb-4">
              <div className="collection-promo">
                <div className="promo-content">
                  <h3>CLASSIC COLLECTIONS</h3>
                  <p>Timeless designs for everyday comfort</p>
                  <Button as={Link} to="/collections/classic" className="btn-promo">
                    Shop Classic
                  </Button>
                </div>
              </div>
            </Col>

            <Col md={6} sm={12} className="mb-4">
              <div className="collection-promo">
                <div className="promo-content">
                  <h3>CASUAL SHOES</h3>
                  <p>Perfect for your relaxed lifestyle</p>
                  <Button as={Link} to="/collections/casual" className="btn-promo">
                    Shop Casual
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Products
