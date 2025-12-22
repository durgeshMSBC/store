import { useState } from 'react'
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrash, FaWhatsapp, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa'
import './Cart.scss'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "BISSELIZING BAGGED CANISTER VACUUM",
      size: "9",
      color: "Black",
      price: 498.32,
      quantity: 1,
      image: "https://via.placeholder.com/100x100/333/FFFFFF?text=Shoe+1"
    },
    {
      id: 2,
      name: "BLACK & RECKEN LENZOIC 09-VOLT MAX",
      size: "10",
      color: "White",
      price: 22.49,
      quantity: 2,
      image: "https://via.placeholder.com/100x100/666/FFFFFF?text=Shoe+2"
    }
  ])

  const [shipping, setShipping] = useState(0)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const handleOrderNow = () => {
    const phoneNumber = "9460092903"
    let message = "Hello! I want to order the following items:\n\n"
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Size: ${item.size}\n`
      message += `   Color: ${item.color}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Price: $${item.price.toFixed(2)}\n\n`
    })
    
    message += `Subtotal: $${subtotal.toFixed(2)}\n`
    message += `Shipping: $${shipping.toFixed(2)}\n`
    message += `Tax: $${tax.toFixed(2)}\n`
    message += `Total: $${total.toFixed(2)}\n\n`
    message += "Please confirm my order!"
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="cart-page-modern">
      <Container className="container-modern">
        <div className="page-header">
          <h1 className="page-title">SHOPPING CART</h1>
          <p className="page-subtitle">Review your items and proceed to checkout</p>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart text-center py-5">
            <div className="empty-cart-icon">
              🛒
            </div>
            <h3>Your cart is empty</h3>
            <p>Add some products to your cart</p>
            <Button as={Link} to="/products" className="btn-shopping">
              <FaArrowLeft className="me-2" />
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <Row>
              <Col lg={8}>
                <div className="cart-items-modern">
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
                        <tr key={item.id}>
                          <td>
                            <div className="product-info">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="product-thumb"
                              />
                              <div className="product-details">
                                <h6>{item.name}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="size-badge">{item.size}</span>
                          </td>
                          <td>
                            <div className="color-display">
                              <span 
                                className="color-dot"
                                style={{ 
                                  backgroundColor: item.color === 'Black' ? '#000' : 
                                                 item.color === 'White' ? '#FFF' : '#FF0000',
                                  border: item.color === 'White' ? '1px solid #ccc' : 'none'
                                }}
                              />
                              <span>{item.color}</span>
                            </div>
                          </td>
                          <td className="price">${item.price.toFixed(2)}</td>
                          <td>
                            <div className="quantity-control">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                          <td className="total">${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
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
                
                <div className="cart-actions mt-4">
                  <Button as={Link} to="/products" className="btn-continue">
                    <FaArrowLeft className="me-2" />
                    Continue Shopping
                  </Button>
                  <Button variant="outline-danger" onClick={() => setCartItems([])}>
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
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-item">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-item">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-item total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="shipping-options mt-4">
                    <h6>Shipping Options</h6>
                    <Form.Check
                      type="radio"
                      label="Standard Shipping - $0.00"
                      name="shipping"
                      checked={shipping === 0}
                      onChange={() => setShipping(0)}
                      className="shipping-option"
                    />
                    <Form.Check
                      type="radio"
                      label="Express Shipping - $15.00"
                      name="shipping"
                      checked={shipping === 15}
                      onChange={() => setShipping(15)}
                      className="shipping-option"
                    />
                    <Form.Check
                      type="radio"
                      label="Overnight Shipping - $30.00"
                      name="shipping"
                      checked={shipping === 30}
                      onChange={() => setShipping(30)}
                      className="shipping-option"
                    />
                  </div>
                  
                  <Button 
                    className="btn-order-whatsapp"
                    onClick={handleOrderNow}
                  >
                    <FaWhatsapp className="me-2" />
                    Order Now via WhatsApp
                  </Button>
                  
                  <p className="whatsapp-note mt-3">
                    <small>
                      You'll be redirected to WhatsApp to confirm your order with our team.
                      Phone: +91 9460092903
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