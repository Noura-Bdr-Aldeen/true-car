import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Button,
    ListGroup,
    Spinner
} from 'react-bootstrap';
import { FaStar, FaGasPump, FaCar, FaTachometerAlt, FaCogs, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { advertisement } from '../../data.js';

const AdvertisementDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setTimeout(() => {
                const foundCar = advertisement.find(item => item.id.toString() === id);
                if (foundCar) {
                    setCar(foundCar);
                } else {
                    setError('Car not found');
                    navigate('/not-found', { replace: true });
                }
                setLoading(false);
            }, 500);
        } catch (err) {
            setError('Failed to load car details');
            setLoading(false);
        }
    }, [id, navigate]);

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading car details...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center py-5">
                <h2>{error}</h2>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Container>
        );
    }

    if (!car) {
        return null;
    }

    return (
        <Container className="my-5">
            <Button variant="light" onClick={() => navigate(-1)} className="mb-4">
                <FaArrowLeft className="me-2" /> Back to Listings
            </Button>

            <Row>
                <Col lg={8}>
                    <Card className="mb-4">
                        <Card.Img
                            variant="top"
                            src={car.image || '/default-car-image.jpg'}
                            alt={`${car.make} ${car.model}`}
                            style={{ height: '400px', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.src = '/default-car-image.jpg';
                            }}
                        />
                        {car.promo && (
                            <Badge bg="danger" className="position-absolute top-0 start-0 m-2 fs-6">
                                {car.promo}
                            </Badge>
                        )}
                    </Card>

                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title as="h2">{car.make} {car.model}</Card.Title>
                            <Card.Subtitle className="mb-3 text-muted">
                                {car.year} • {car.mileage.toLocaleString()} miles
                            </Card.Subtitle>
                            <Card.Text className="fs-5">
                                {car.description || 'This vehicle is in excellent condition with a clean history report.'}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header as="h5">Features & Specifications</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex align-items-center">
                                <FaTachometerAlt className="me-3 text-primary" />
                                <div>
                                    <strong>Mileage:</strong> {car.mileage.toLocaleString()} miles
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center">
                                <FaGasPump className="me-3 text-primary" />
                                <div>
                                    <strong>Fuel Economy:</strong> {car.fuelEconomy || '25 MPG city / 32 MPG highway'}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center">
                                <FaCogs className="me-3 text-primary" />
                                <div>
                                    <strong>Transmission:</strong> {car.transmission || 'Automatic'}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center">
                                <FaCalendarAlt className="me-3 text-primary" />
                                <div>
                                    <strong>Year:</strong> {car.year}
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="sticky-top" style={{ top: '20px' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3 className="mb-0 text-primary">${car.price.toLocaleString()}</h3>
                                <div className="d-flex align-items-center">
                                    <FaStar className="text-warning me-1" />
                                    <span>{car.rating}</span>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="w-100 mb-3">
                                Contact Seller
                            </Button>

                            <Button variant="outline-primary" size="lg" className="w-100">
                                Schedule Test Drive
                            </Button>

                            <hr className="my-4" />

                            <h5 className="mb-3">Key Features</h5>
                            <div className="d-flex flex-wrap">
                                {car.features.map((feature, index) => (
                                    <Badge key={index} bg="light" text="dark" className="me-2 mb-2 p-2">
                                        {feature}
                                    </Badge>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdvertisementDetails;