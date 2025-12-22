import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaLinkedin, FaStar, FaAward, FaUsers, FaShippingFast, FaHeart } from 'react-icons/fa'
import './About.scss'

const About = () => {
  const teamMembers = [
    {
      name: "John Smith",
      position: "CEO & Founder",
      image: "https://via.placeholder.com/250x300/333/FFFFFF?text=John+Smith",
      bio: "With over 15 years in the fashion industry, John founded N.O.Z StreetStyle with a vision to blend comfort with urban style.",
      social: {
        instagram: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Sarah Johnson",
      position: "Head Designer",
      image: "https://via.placeholder.com/250x300/666/FFFFFF?text=Sarah+Johnson",
      bio: "Sarah brings innovative designs and sustainable materials to create shoes that are both stylish and eco-friendly.",
      social: {
        instagram: "#",
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Mike Chen",
      position: "Operations Manager",
      image: "https://via.placeholder.com/250x300/444/FFFFFF?text=Mike+Chen",
      bio: "Mike ensures our supply chain runs smoothly and customers receive their orders promptly.",
      social: {
        instagram: "#",
        twitter: "#",
        linkedin: "#"
      }
    }
  ]

  const stats = [
    { icon: <FaAward />, number: "5+", label: "Years Experience", color: "#FFD700" },
    { icon: <FaUsers />, number: "10K+", label: "Happy Customers", color: "#25D366" },
    { icon: <FaShippingFast />, number: "50+", label: "Store Locations", color: "#FF2D2D" },
    { icon: <FaHeart />, number: "24/7", label: "Customer Support", color: "#FF6B9D" }
  ]

  return (
    <div className="about-page-modern">
      {/* Hero Section */}
      <section className="about-hero">
        <Container className="container-modern">
          <Row className="align-items-center min-vh-80">
            <Col lg={6} className="hero-content">
              <h1 className="hero-title">
                ABOUT
                <br />
                <span className="hero-highlight">N.O.Z STREETSTYLE</span>
              </h1>
              <p className="hero-description">
                Where fashion meets comfort, and style meets street. We're redefining urban footwear 
                one step at a time with our commitment to quality, innovation, and customer satisfaction.
              </p>
              <Button as={Link} to="/products" className="btn-explore">
                Explore Our Collection
              </Button>
            </Col>
            <Col lg={6} className="hero-image-col">
              <div className="hero-image-wrapper">
                <Image 
                  src="https://via.placeholder.com/500x400/000/FFFFFF?text=ABOUT+US"
                  alt="About N.O.Z StreetStyle"
                  fluid
                  className="hero-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Founder Section */}
      <section className="founder-section">
        <Container className="container-modern">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">MEET OUR FOUNDER</h2>
            <p className="section-subtitle">The vision behind N.O.Z StreetStyle</p>
          </div>
          
          <Row className="align-items-center">
            <Col lg={4} className="mb-4 mb-lg-0">
              <div className="founder-image-container">
                <Image 
                  src="https://via.placeholder.com/400x500/222/FFFFFF?text=Founder" 
                  alt="Alex Rodriguez - Founder"
                  fluid
                  className="founder-image"
                />
                <div className="founder-badge">
                  <span>Founder & CEO</span>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="founder-content">
                <h3 className="founder-name">Alex Rodriguez</h3>
                <h5 className="founder-title">Founder & Creative Director</h5>
                
                <div className="founder-bio">
                  <p>
                    Alex Rodriguez started N.O.Z StreetStyle in 2018 with a simple yet powerful vision: 
                    to create footwear that combines urban style with unparalleled comfort. With a background 
                    in both fashion design and sports science, Alex understands what makes a shoe not just 
                    look good, but feel great.
                  </p>
                  <p>
                    "I believe that everyone deserves to express their personal style without compromising on comfort. 
                    That's why every pair of N.O.Z shoes undergoes rigorous testing and design refinement before 
                    it reaches your feet."
                  </p>
                  <p>
                    Under Alex's leadership, N.O.Z has grown from a small startup to a recognized brand in urban 
                    fashion, with a commitment to sustainable practices and community engagement.
                  </p>
                </div>
                
                <div className="founder-social mt-4">
                  <h6>Connect with Alex:</h6>
                  <div className="social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaTwitter />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container className="container-modern">
          <Row>
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="stat-card">
                  <div className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <Container className="container-modern">
          <Row>
            <Col lg={6} className="mb-4">
              <div className="mission-card">
                <h3 className="card-title">Our Mission</h3>
                <p>
                  To empower individuals to express their unique style through high-quality, comfortable, 
                  and sustainable footwear that stands up to urban life. We're committed to innovation 
                  while maintaining our core values of quality and customer satisfaction.
                </p>
              </div>
            </Col>
            <Col lg={6} className="mb-4">
              <div className="vision-card">
                <h3 className="card-title">Our Vision</h3>
                <p>
                  To become the leading global brand in urban footwear, recognized for innovation, 
                  sustainability, and community impact. We aim to set new standards in the industry 
                  while making a positive difference in the communities we serve.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <Container className="container-modern">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">OUR LEADERSHIP TEAM</h2>
            <p className="section-subtitle">Meet the experts behind our success</p>
          </div>
          
          <Row>
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <div className="team-card">
                  <div className="team-image-container">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fluid
                      className="team-image"
                    />
                    <div className="team-social">
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                      </a>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                  <div className="team-content">
                    <h4 className="team-name">{member.name}</h4>
                    <h6 className="team-position">{member.position}</h6>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <Container className="container-modern">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">OUR CORE VALUES</h2>
          </div>
          
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div className="value-card">
                <h5>Quality First</h5>
                <p>We never compromise on the quality of materials and craftsmanship.</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="value-card">
                <h5>Customer Focus</h5>
                <p>Our customers are at the heart of everything we do.</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="value-card">
                <h5>Innovation</h5>
                <p>Constantly pushing boundaries in design and technology.</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="value-card">
                <h5>Sustainability</h5>
                <p>Committed to eco-friendly practices and materials.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <Container className="container-modern">
          <div className="cta-content text-center">
            <h2 className="cta-title">Ready to Experience N.O.Z StreetStyle?</h2>
            <p className="cta-text">
              Join thousands of satisfied customers who trust us for their footwear needs.
              Discover the perfect blend of style and comfort.
            </p>
            <div className="cta-buttons">
              <Button as={Link} to="/products" className="btn-cta-primary me-3">
                Shop Now
              </Button>
              <Button as={Link} to="/contact" className="btn-cta-secondary">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default About