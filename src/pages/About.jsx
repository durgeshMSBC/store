import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaAward,
  FaUsers,
  FaShippingFast,
  FaHeart
} from 'react-icons/fa'
import './About.scss'

const About = () => {
  const stats = [
    { icon: <FaAward />, number: 'OG', label: 'Vietnam Quality', color: '#FFD700' },
    { icon: <FaUsers />, number: '1000+', label: 'Happy Customers', color: '#25D366' },
    { icon: <FaShippingFast />, number: 'PAN INDIA', label: 'Fast Delivery', color: '#FF2D2D' },
    { icon: <FaHeart />, number: '100%', label: 'Quality Guarantee', color: '#FF6B9D' }
  ]

  return (
    <div className="about-page-modern">

      {/* HERO */}
      <section className="about-hero">
        <Container className="container-modern">
          <Row className="align-items-center">
            <Col lg={6} className="hero-content mb-4 mb-lg-0">
              <h1 className="hero-title">
                BUILT BY <br />
                <span className="hero-highlight">AN ENGINEER</span>
              </h1>

              <p className="hero-description">
                I’m Durgesh Suthar — a software engineer building a premium
                OG-quality footwear brand. We deliver authentic Vietnam
                imports at the best price in the market.
              </p>

              <Button as={Link} to="/products" className="btn-explore">
                Explore Collection
              </Button>
            </Col>

            <Col lg={6}>
              <Image
                src="https://via.placeholder.com/500x400/000/FFFFFF?text=OG+Vietnam+Shoes"
                fluid
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOUNDER */}
      <section className="founder-section">
        <Container className="container-modern">
          <Row className="align-items-center">
            <Col lg={4} className="mb-4 mb-lg-0 text-center">
              <div className="founder-image-container">
                <Image
                  src="https://via.placeholder.com/400x500/111/FFFFFF?text=Durgesh+Suthar"
                  fluid
                  className="founder-image"
                />
                <span className="founder-badge">Founder</span>
              </div>
            </Col>

            <Col lg={8}>
              <div className="founder-content">
                <h3 className="founder-name">Durgesh Suthar</h3>
                <h5 className="founder-title">
                  Software Engineer • Founder
                </h5>

                <div className="founder-bio">
                  <p>
                    Coming from a software engineering background, I believe
                    in systems, transparency, and logic-driven decisions.
                    This brand was born to solve one problem — premium shoes
                    should not be overpriced.
                  </p>

                  <p>
                    We source OG-quality shoes directly from trusted
                    manufacturers in Vietnam. Every pair is quality-checked
                    and delivered with confidence.
                  </p>

                  <p>
                    This is not just footwear — it’s a value-driven business
                    built on trust.
                  </p>
                </div>

                <div className="founder-social mt-4">
                  <h6>Connect with Me</h6>
                  <div className="social-icons">
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaLinkedin /></a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <Container className="container-modern">
          <Row>
            {stats.map((s, i) => (
              <Col lg={3} md={6} key={i} className="mb-4">
                <div className="stat-card">
                  <div className="stat-icon" style={{ color: s.color }}>
                    {s.icon}
                  </div>
                  <h3 className="stat-number">{s.number}</h3>
                  <p className="stat-label">{s.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FOUNDER PROFILE CARD */}
      <section className="founder-profile-section">
        <Container className="container-modern">
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="founder-profile-card text-center">
                <Image
                  src="https://via.placeholder.com/150/000/FFFFFF?text=DS"
                  roundedCircle
                  className="mb-3"
                />
                <h4>Durgesh Suthar</h4>
                <p>
                  Engineer building an honest, affordable premium footwear
                  brand powered by global sourcing.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <Container className="container-modern">
          <h2 className="cta-title">Built on Trust. Designed for Comfort.</h2>
          <p className="cta-text">
            Discover OG Vietnam footwear crafted for everyday street style.
          </p>
          <div className="cta-buttons">
            <Button as={Link} to="/products" className="btn-cta-primary">
              Shop Now
            </Button>
            <Button as={Link} to="/contact" className="btn-cta-secondary">
              Contact Me
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default About
