import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, FloatingLabel } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import car from "../assets/images/car-evaluation-background.jpg";

const EvaluationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        message: '',
        type: 'evaluation'
    });
    const [submitted, setSubmitted] = useState(false);
    const [hover, setHover] = useState(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newEvaluation) =>
            axios.post('http://localhost:3000/evaluations', newEvaluation, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(error => {
                console.error('Detailed error:', error.response);
                throw error;
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['evaluations'] });
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                rating: 5,
                message: '',
                type: 'evaluation'
            });
            setTimeout(() => setSubmitted(false), 3000);
        },
        onError: (error) => {
            console.error('Error submitting evaluation:', error);
            alert('Failed to submit evaluation. Please try again.');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${car})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Container>
                <Row className="justify-content-start">
                    <Col xs={12} md={10} lg={8} className="bg-gradient p-4 rounded-3 shadow opacity-100">
                        <h2 className="text-center mb-4 text-light">Share Your Feedback</h2>

                        {submitted && (
                            <Alert variant="success" className="mb-4">
                                Thank you for your feedback!
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col md={6} className="mb-3 mb-md-0">
                                    <FloatingLabel controlId="name" label="Your Name">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                                color: '#ffffff'
                                            }}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={6}>
                                    <FloatingLabel controlId="email" label="Email Address">
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="name@example.com"
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                                color: '#ffffff'
                                            }}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3 text-light">
                                <Form.Label>Feedback Type</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Evaluation"
                                        name="type"
                                        value="evaluation"
                                        checked={formData.type === 'evaluation'}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Complaint"
                                        name="type"
                                        value="complaint"
                                        checked={formData.type === 'complaint'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>

                            {formData.type === 'evaluation' && (
                                <Form.Group className="mb-3 text-light">
                                    <Form.Label>Rating</Form.Label>
                                    <div className="d-flex align-items-center">
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1;
                                            return (
                                                <label key={i} style={{ cursor: 'pointer' }}>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        value={ratingValue}
                                                        onClick={() => setFormData(prev => ({
                                                            ...prev,
                                                            rating: ratingValue
                                                        }))}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <FaStar
                                                        className="mx-1"
                                                        size={30}
                                                        color={ratingValue <= (hover || formData.rating) ? "#ffc107" : "#e4e5e9"}
                                                        onMouseEnter={() => setHover(ratingValue)}
                                                        onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>
                                </Form.Group>
                            )}

                            <FloatingLabel controlId="message" label="Your Feedback" className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        height: '150px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        color: '#ffffff'
                                    }}
                                    placeholder="Share your thoughts..."
                                />
                            </FloatingLabel>

                            <div className="d-grid">
                                <Button
                                    variant="dark"
                                    type="submit"
                                    size="lg"
                                    disabled={mutation.isLoading}
                                >
                                    {mutation.isLoading ? 'Submitting...' : 'Submit Feedback'}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EvaluationForm;