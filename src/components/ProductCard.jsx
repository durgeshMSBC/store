import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FaStar, FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa'
import './ProductCard.scss'

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const sizes = ['7', '8', '9', '10', '11', '12']
  const colors = [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Gray', code: '#808080' }
  ]

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color')
      return
    }
    
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor
    }
    
    onAddToCart(cartItem)
  }

  const handleQuickView = () => {
    onQuickView(product)
  }

  return (
    <Card 
      className={`product-card-modern ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge */}
      {product.discount && (
        <div className="product-badge discount">
          -{product.discount}%
        </div>
      )}
      {product.isNew && (
        <div className="product-badge new">
          NEW
        </div>
      )}

      {/* Product Image */}
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        
        {/* Quick Actions Overlay */}
        <div className={`quick-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className="quick-action-btn wishlist"
            onClick={() => setIsWishlisted(!isWishlisted)}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FaHeart className={isWishlisted ? 'filled' : ''} />
          </button>
          <button 
            className="quick-action-btn quick-view"
            onClick={handleQuickView}
            title="Quick View"
          >
            <FaEye />
          </button>
          <button 
            className="quick-action-btn add-to-cart-main"
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
            title="Add to Cart"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      <Card.Body>
        {/* Category */}
        <div className="product-category">
          {product.category}
        </div>

        {/* Name */}
        <Card.Title className="product-name">
          {product.name}
        </Card.Title>

        {/* Description */}
        <div className="product-description">
          <p className="latin-text">
            Per sescala quarta decima et quinta decima. Ecoleno modo tepi...
          </p>
          <h6>ARNEANIN CONSEQUATIO SAGITTIS LACINI</h6>
        </div>

        {/* Color Selection */}
        <div className="color-selection">
          <p className="selection-label">Color:</p>
          <div className="color-options">
            {colors.map(color => (
              <button
                key={color.name}
                className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
                style={{ backgroundColor: color.code }}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="size-selection">
          <p className="selection-label">Size:</p>
          <div className="size-options">
            {sizes.map(size => (
              <button
                key={size}
                className={`size-option ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="star-icon" />
            ))}
          </div>
          <span className="rating-text">(4.5)</span>
          <span className="review-count">128 Reviews</span>
        </div>

        {/* Price & Action */}
        <div className="product-price-section">
          <div className="price-container">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            className="add-to-cart-btn-modern"
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
          >
            <FaShoppingCart className="me-2" />
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard