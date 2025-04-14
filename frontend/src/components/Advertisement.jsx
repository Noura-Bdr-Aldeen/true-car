import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Carousel } from 'react-bootstrap';
import { FaStar, FaGasPump, FaCar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { advertisement } from '../../data';
import { Link } from 'react-router-dom';


const Advertisement = () => {
    const [index, setIndex] = useState(0);

    // Auto-rotate slides every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % advertisement.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='bg-dark-subtle'>
            <Container className="mt-5 pt-3">
                <h2 className="text-center text-success p-4">Advertisement</h2>

                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    indicators={false}
                    prevIcon={<FaChevronLeft className="text-dark" size={24} />}
                    nextIcon={<FaChevronRight className="text-dark" size={24} />}
                    interval={null} // We handle the interval manually
                >
                    {advertisement.map((car) => (
                        <Carousel.Item key={car.id}>
                            <Row className="g-4 justify-content-center">
                                <Col xs={12} md={8} lg={6}>
                                    <Card className="h-100 shadow-sm">
                                        <div className="position-relative">
                                            <Card.Img
                                                variant="top"
                                                src={car.image}
                                                alt={`${car.make} ${car.model}`}
                                                style={{ height: '300px', objectFit: 'cover' }}
                                            />
                                            {car.promo && (
                                                <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                                                    {car.promo}
                                                </Badge>
                                            )}
                                        </div>
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <Card.Title>{car.make} {car.model}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">
                                                        {car.year} • {car.mileage.toLocaleString()} miles
                                                    </Card.Subtitle>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <FaStar className="text-warning me-1" />
                                                    <span>{car.rating}</span>
                                                </div>
                                            </div>

                                            <div className="my-3">
                                                <h5 className="text-primary">${car.price.toLocaleString()}</h5>
                                            </div>

                                            <div className="d-flex mb-3">
                                                <div className="me-3">
                                                    <FaGasPump className="me-1" />
                                                    <small>25 MPG</small>
                                                </div>
                                                <div>
                                                    <FaCar className="me-1" />
                                                    <small>Sedan</small>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                {car.features.map((feature, index) => (
                                                    <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                                                        {feature}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className="bg-white border-top-0">
                                            <Link to={`/cars/${car.id}`}>
                                                <button
                                                    className="btn btn-primary w-100"
                                                >
                                                    View Details
                                                </button>
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>

                {/* Custom indicators */}
                <div className="d-flex justify-content-center mt-3">
                    {advertisement.map((_, idx) => (
                        <button
                            key={idx}
                            className={`mx-1 p-2 border-0 bg-transparent ${index === idx ? 'text-primary' : 'text-secondary'}`}
                            onClick={() => setIndex(idx)}
                            style={{ cursor: 'pointer' }}
                        >
                            ●
                        </button>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Advertisement;