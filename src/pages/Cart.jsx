import { useState } from 'react'
import { Container, Row, Col, Table, Button, Form, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrash, FaWhatsapp, FaPlus, FaMinus, FaArrowLeft, FaTruck, FaShieldAlt, FaSyncAlt, FaCreditCard } from 'react-icons/fa'
import './Cart.scss'
import shoes1 from '../assets/nike-1.webp'
import shoes2 from '../assets/nike-2.webp'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, shipping, setShipping, appliedCoupon, applyCoupon, computeDiscount, formatPrice, markOrderPlaced } = useCart()
  const [couponInput, setCouponInput] = useState('')

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = computeDiscount(subtotal)
  const tax = (subtotal - discount) * 0.08
  const shippingForTotal = appliedCoupon && appliedCoupon.kind === 'shipping' ? 0 : shipping
  const total = subtotal - discount + shippingForTotal + tax

  const handleApplyCoupon = () => {
    const ok = applyCoupon(couponInput, subtotal)
    if (!ok) {
      alert('Invalid or inapplicable coupon code')
    }
  }

  const handleOrderNow = () => {
    // mark first-time order (keeps FIRST10 logic intact)
    markOrderPlaced()
    const phoneNumber = "9460092903"
    let message = "🚀 *NEW ORDER REQUEST*\n\n"
    message += "*Customer Information:*\n"
    message += "--------------------\n\n"
    message += "*Order Details:*\n"
    message += "--------------------\n"
    
    cartItems.forEach((item, index) => {
      message += `\n*${index + 1}. ${item.name}*\n`
      message += `   📦 Code: ${item.code}\n`
      message += `   📏 Size: ${item.size}\n`
      message += `   🎨 Color: ${item.color}\n`
      message += `   🔢 Quantity: ${item.quantity}\n`
      message += `   💰 Price: ${formatPrice(item.price)}\n`
      message += `   📊 Total: ${formatPrice(item.price * item.quantity)}\n`
      message += `   ${item.inStock ? '✅ In Stock' : '⚠️ Out of Stock'}\n`
    })
    
    message += "\n--------------------\n"
    message += `\n*Subtotal:* ${formatPrice(subtotal)}`
    if (discount > 0) {
      message += `\n*Discount (${appliedCoupon ? appliedCoupon.code : ''}):* -${formatPrice(discount)}`
    }
    message += `\n*Shipping:* ${formatPrice(shippingForTotal)}`
    message += `\n*Tax:* ${formatPrice(tax)}`
    message += `\n*Total Amount:* ${formatPrice(total)}`
    message += "\n\n--------------------\n"
    message += "\n📞 *Contact Details:*\n"
    message += "Please contact me to confirm shipping address and payment details.\n\n"
    message += "Best regards,\n[Your Name]"
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="cart-page-modern">
      <Container className="container-modern">
        <div className="page-header">
          <h1 className="page-title">SHOPPING CART</h1>
          <p className="page-subtitle">
            Review your selected items. Add more or proceed to secure checkout.
          </p>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart text-center py-5">
            <div className="empty-cart-icon">
              🛒
            </div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Button as={Link} to="/products" className="btn-shopping">
              <FaArrowLeft className="me-2" />
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <Row>
              <Col lg={8}>
                <div className="cart-items-modern">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">
                      Your Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </h4>
                    <Badge bg="light" text="dark" className="px-3 py-2">
                      {cartItems.filter(item => item.inStock).length} in stock
                    </Badge>
                  </div>
                  
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>SIZE</th>
                        <th>COLOR</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.id} data-label="product" data-aos="fade-up">
                          <td data-label="Product">
                            <div className="product-info">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="product-thumb"
                              />
                              <div className="product-details">
                                <h6>{item.name}</h6>
                                <div className="product-code">{item.code}</div>
                                {!item.inStock && (
                                  <Badge bg="warning" text="dark" className="mt-2">
                                    Out of Stock
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td data-label="Size">
                            <span className="size-badge">{item.size}</span>
                          </td>
                          <td data-label="Color">
                            <div className="color-display">
                              <span 
                                className="color-dot"
                                style={{ 
                                  backgroundColor: item.color === 'Black' ? '#000' : 
                                                 item.color === 'White' ? '#FFF' : 
                                                 item.color === 'Red' ? '#FF0000' : '#333',
                                  border: item.color === 'White' ? '2px solid #ccc' : 'none'
                                }}
                              />
                              <span>{item.color}</span>
                            </div>
                          </td>
                          <td data-label="Price" className="price">
                            {formatPrice(item.price)}
                          </td>
                          <td data-label="Quantity">
                            <div className="quantity-control">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus />
                              </Button>
                              <span className="quantity">{item.quantity}</span>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </td>
                          <td data-label="Total" className="total">
                            {formatPrice(item.price * item.quantity)}
                          </td>
                          <td data-label="Action">
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              className="remove-btn"
                              onClick={() => removeItem(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                
                <div className="cart-actions">
                  <Button as={Link} to="/products" className="btn-continue">
                    <FaArrowLeft className="me-2" />
                    Continue Shopping
                  </Button>
                  <Button variant="outline-danger" onClick={() => clearCart()}>
                    <FaTrash className="me-2" />
                    Clear Cart
                  </Button>
                </div>
              </Col>
              
              <Col lg={4}>
                <div className="cart-summary-modern">
                  <h3 className="summary-title">ORDER SUMMARY</h3>
                  
                  <div className="summary-items">
                    <div className="summary-item">
                      <span>Subtotal</span>
                          <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="summary-item">
                      <span>Discount</span>
                        <span className="text-success">
                        {discount > 0 ? `-${formatPrice(discount)}` : formatPrice(0)}
                      </span>
                    </div>
                    
                    <div className="summary-item">
                      <span>
                        <FaTruck className="me-2" />
                        Shipping
                      </span>
                      <span>{formatPrice(shippingForTotal)}</span>
                    </div>
                    
                    <div className="summary-item">
                      <span>
                        <FaShieldAlt className="me-2" />
                        Tax (8%)
                      </span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    
                    <div className="summary-item total">
                        <span>Total Amount</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <div className="coupon-section mt-4">
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          disabled={!!appliedCoupon}
                        />
                        <Button 
                          variant={appliedCoupon ? "success" : "dark"}
                          onClick={handleApplyCoupon}
                          disabled={!!appliedCoupon}
                        >
                          {appliedCoupon ? 'Applied' : 'Apply'}
                        </Button>
                      </div>
                      {appliedCoupon && (
                        <small className="text-success d-block mt-2">
                          🎉 {appliedCoupon.description} ({appliedCoupon.code})
                        </small>
                      )}
                  </div>
                  
                  <div className="shipping-options mt-4">
                    <h6>
                      <FaTruck className="me-2" />
                      Shipping Options
                    </h6>
                    <Form.Check
                      type="radio"
                      label={
                        <>
                          Standard Shipping
                          <span className="shipping-price">{formatPrice(0)}</span>
                        </>
                      }
                      name="shipping"
                      checked={shipping === 0}
                      onChange={() => setShipping(0)}
                      className="shipping-option"
                    />
                    <Form.Check
                      type="radio"
                      label={
                        <>
                          Express Shipping (2-3 days)
                          <span className="shipping-price">{formatPrice(150)}</span>
                        </>
                      }
                      name="shipping"
                      checked={shipping === 150}
                      onChange={() => setShipping(150)}
                      className="shipping-option"
                    />
                    <Form.Check
                      type="radio"
                      label={
                        <>
                          Overnight Shipping
                          <span className="shipping-price">{formatPrice(300)}</span>
                        </>
                      }
                      name="shipping"
                      checked={shipping === 300}
                      onChange={() => setShipping(300)}
                      className="shipping-option"
                    />
                  </div>
                  
                  <div className="security-features mt-4 p-3 bg-light rounded">
                    <div className="d-flex align-items-center mb-2">
                      <FaShieldAlt className="text-success me-2" />
                      <small className="text-muted">Secure SSL Encryption</small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaSyncAlt className="text-primary me-2" />
                      <small className="text-muted">30-Day Return Policy</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaCreditCard className="text-info me-2" />
                      <small className="text-muted">Multiple Payment Options</small>
                    </div>
                  </div>
                  
                  <Button 
                    className="btn-order-whatsapp mt-4"
                    onClick={handleOrderNow}
                    disabled={cartItems.length === 0 || cartItems.some(item => !item.inStock)}
                  >
                    <FaWhatsapp className="me-2" />
                    Order Now via WhatsApp
                  </Button>
                  
                  <p className="whatsapp-note mt-3">
                    <small>
                      💬 You'll be redirected to WhatsApp to complete your order.<br/>
                      📞 <strong>Support:</strong> +91 9460092903<br/>
                      ⏰ <strong>Hours:</strong> 9AM - 9PM (7 days)
                    </small>
                  </p>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  )
}

export default Cart