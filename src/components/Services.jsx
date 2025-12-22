import { Container, Row, Col } from 'react-bootstrap'
import { FaShippingFast, FaTag, FaHeadset, FaGift } from 'react-icons/fa'
import './Services.scss'

const Services = () => {
  const services = [
    {
      icon: <FaShippingFast />,
      title: "FREE SHIPPING",
      description: "On all order over $2000"
    },
    {
      icon: <FaShippingFast />,
      title: "FREE SHIPPING",
      description: "On all order over $2000"
    },
    {
      icon: <FaTag />,
      title: "MEMBER DISCOUNT",
      description: "Register and save up to $29%"
    },
    {
      icon: <FaHeadset />,
      title: "PREMIUM SUPPORT",
      description: "Support 24 hours per day"
    }
  ]

  return (
    <section className="services-modern">
      <Container className="container-modern">
        <Row className="g-0">
          {services.map((service, index) => (
            <Col lg={3} md={6} key={index}>
              <div className={`service-card-modern ${index % 2 === 0 ? 'light' : 'dark'}`}>
                <div className="service-icon-wrapper">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                </div>
                <div className="service-content">
                  <h5 className="service-title">{service.title}</h5>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services