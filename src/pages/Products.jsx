import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFilter, FaSort } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import './Products.scss'

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "BISSELIZING BAGGED CANISTER VACUUM",
      category: "PURPLE.4122",
      price: 498.32,
      originalPrice: 599.99,
      discount: 17,
      image: "https://via.placeholder.com/300x250/333/FFFFFF?text=PREMIUM+SHOE",
      isNew: true,
      type: "Running"
    },
    {
      id: 2,
      name: "BLACK & RECKEN LENZOIC 09-VOLT MAX",
      category: "LITHIUM-10V DRILL",
      price: 22.49,
      originalPrice: 34.99,
      discount: 36,
      image: "https://via.placeholder.com/300x250/666/FFFFFF?text=SPORTS+SHOE",
      type: "Casual"
    },
    {
      id: 3,
      name: "ROSS OFFICE PRODUCTS RECEPTION",
      category: "BURTON NIEWS SPECTRE",
      price: 89.99,
      originalPrice: 120.00,
      discount: 25,
      image: "https://via.placeholder.com/300x250/444/FFFFFF?text=CASUAL+SHOE",
      isNew: true,
      type: "Basketball"
    },
    {
      id: 4,
      name: "RUNNING PRO SHOES",
      category: "PERFORMANCE",
      price: 159.99,
      originalPrice: 199.99,
      discount: 20,
      image: "https://via.placeholder.com/300x250/555/FFFFFF?text=RUNNING+SHOE",
      type: "Running"
    },
    {
      id: 5,
      name: "BASKETBALL PRO",
      category: "SPORTS",
      price: 179.99,
      image: "https://via.placeholder.com/300x250/777/FFFFFF?text=BASKETBALL",
      type: "Basketball"
    },
    {
      id: 6,
      name: "CASUAL SNEAKERS",
      category: "EVERYDAY",
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      image: "https://via.placeholder.com/300x250/888/FFFFFF?text=CASUAL",
      isNew: true,
      type: "Casual"
    }
  ])

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 1000])

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product)
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

  const handleTypeFilter = (type) => {
    setSelectedType(type)
    if (type === 'All') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.type === type))
    }
  }

  const handleSort = (value) => {
    setSortBy(value)
    let sorted = [...filteredProducts]
    
    switch(value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    
    setFilteredProducts(sorted)
  }

  const types = ['All', 'Running', 'Casual', 'Basketball']

  return (
    <div className="products-page-modern">
      <Container className="container-modern">
        <div className="page-header">
          <h1 className="page-title">OUR PRODUCTS</h1>
          <p className="page-subtitle">Discover our premium collection of shoes</p>
        </div>
        
        {/* Filter & Sort Bar */}
        <div className="filter-sort-bar">
          <div className="filter-section">
            <FaFilter className="filter-icon" />
            <span className="filter-label">Filter by:</span>
            <div className="filter-buttons">
              {types.map(type => (
                <button
                  key={type}
                  className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                  onClick={() => handleTypeFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="sort-section">
            <FaSort className="sort-icon" />
            <span className="sort-label">Sort by:</span>
            <Form.Select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </Form.Select>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="products-grid-section">
          <Row>
            {filteredProducts.map(product => (
              <Col lg={4} md={6} className="mb-4" key={product.id}>
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              </Col>
            ))}
          </Row>
        </div>
        
        {/* No Products */}
        {filteredProducts.length === 0 && (
          <div className="no-products text-center py-5">
            <h3>No products found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
        
        {/* Collections Banner */}
        <div className="collections-banner mt-5">
          <Row>
            <Col md={6} className="mb-4">
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
            <Col md={6} className="mb-4">
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