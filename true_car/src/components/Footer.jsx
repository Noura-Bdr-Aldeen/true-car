import { Container, Row, Col } from 'react-bootstrap';
import {
  Facebook,
  Twitter,
  Google,
  Instagram,
  Linkedin,
  Github
} from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <footer className="bg-dark-subtle text-muted">
      <Container fluid className="border-bottom">
        <Row className="py-4 d-flex align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div>
              © {new Date().getFullYear()} Copyright:
              <a className="text-reset fw-bold ms-1 text-decoration-none" href="#">
                TrueCar.com
              </a>
            </div>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#" className="me-4 text-reset">
              <Facebook className="fs-5" />
            </a>
            <a href="#" className="me-4 text-reset">
              <Twitter className="fs-5" />
            </a>
            <a href="#" className="me-4 text-reset">
              <Google className="fs-5" />
            </a>
            <a href="#" className="me-4 text-reset">
              <Instagram className="fs-5" />
            </a>
            <a href="#" className="me-4 text-reset">
              <Linkedin className="fs-5" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;