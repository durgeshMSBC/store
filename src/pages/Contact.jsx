import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaPaperPlane } from 'react-icons/fa'
import './Contact.scss'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Show success message
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Message sent successfully! We\'ll contact you soon.'
      }
    })
    window.dispatchEvent(event)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["+91 9460092903", "+1 (555) 123-4567"]
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["support@nozstreetstyle.com", "orders@nozstreetstyle.com"]
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      details: ["123 Street Style Avenue", "Fashion District, NY 10001"]
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      details: ["Monday - Friday: 8am - 10pm", "Saturday & Sunday: 10am - 8pm"]
    }
  ]

  return (
    <div className="contact-page-modern">
      <Container className="container-modern">
        <div className="page-header">
          <h1 className="page-title">CONTACT US</h1>
          <p className="page-subtitle">Get in touch with us for any inquiries or support</p>
        </div>
        
        <Row className="mt-5">
          <Col lg={6} className="mb-5">
            <div className="contact-info-modern">
              <h2 className="section-title">GET IN TOUCH</h2>
              
              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <div className="contact-item" key={index}>
                    <div className="contact-icon-wrapper">
                      <div className="contact-icon">
                        {info.icon}
                      </div>
                    </div>
                    <div className="contact-text">
                      <h5>{info.title}</h5>
                      {info.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="whatsapp-contact mt-5">
                <div className="whatsapp-card">
                  <div className="whatsapp-icon">
                    <FaWhatsapp />
                  </div>
                  <div className="whatsapp-content">
                    <h5>Quick Order via WhatsApp</h5>
                    <p>Click below to message us directly on WhatsApp for instant support</p>
                    <Button 
                      as="a" 
                      href="https://wa.me/9460092903"
                      target="_blank"
                      className="btn-whatsapp"
                    >
                      <FaWhatsapp className="me-2" />
                      Message on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <div className="contact-form-modern">
              <h2 className="section-title">SEND MESSAGE</h2>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control 
                        type="text" 
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Returns & Exchange">Returns & Exchange</option>
                    <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>
                
                <Button type="submit" className="btn-submit">
                  <FaPaperPlane className="me-2" />
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        
        <div className="map-section mt-5">
          <h2 className="section-title text-center mb-4">FIND US</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <h4>Our Location</h4>
              <p>123 Street Style Avenue, Fashion District</p>
              <p>New York, NY 10001</p>
              <Button variant="outline-light" className="mt-3">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact