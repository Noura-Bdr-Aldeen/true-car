import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { api } from '../api/constant';

const AddNewCar = ({ authToken }) => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        price: '',
        images: [],
        description: '',
        color: '',
        country: '',
        city: ''
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e, index) => {
        const files = e.target.files;
        if (files?.[0]) {
            const newImageFiles = [...imageFiles];
            newImageFiles[index] = files[0];
            setImageFiles(newImageFiles);

            const reader = new FileReader();
            reader.onload = (event) => {
                const newImages = [...formData.images];
                newImages[index] = event.target.result;
                setFormData(prev => ({ ...prev, images: newImages }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        const newImageFiles = imageFiles.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, images: newImages }));
        setImageFiles(newImageFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'images') formDataToSend.append(key, value);
            });
            imageFiles.forEach((file, index) => file && formDataToSend.append(`images[${index}]`, file));

            await axios.post(`${api}/cars`, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add car. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <Container>
                <Card bg="dark" text="white" border="secondary">
                    <Card.Body className="text-center p-4">
                        <Alert variant="success" className="mb-3">
                            <h5 className="mb-0">Car Added Successfully!</h5>
                        </Alert>
                        <Button
                            variant="outline-light"
                            onClick={() => {
                                setSuccess(false);
                                setFormData({
                                    brand: '',
                                    model: '',
                                    year: '',
                                    price: '',
                                    images: [],
                                    description: '',
                                    color: '',
                                    country: '',
                                    city: ''
                                });
                                setImageFiles([]);
                            }}
                        >
                            Add Another Car
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-3 mb-5" style={{ maxWidth: '400px' }}>
            <Card bg="dark" text="white" border="secondary">
                <Card.Header className="bg-dark border-secondary">
                    <h5 className="mb-0">Add New Car</h5>
                </Card.Header>
                <Card.Body className="p-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        className="bg-dark text-white border-secondary"
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        className="bg-dark text-white border-secondary"
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control
                                        className="bg-dark text-white border-secondary"
                                        type="number"
                                        name="year"
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price ($)</Form.Label>
                                    <Form.Control
                                        className="bg-dark text-white border-secondary"
                                        type="number"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        className="bg-dark text-white border-secondary"
                                        type="text"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                className="bg-dark text-white border-secondary"
                                as="textarea"
                                rows={2}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        className="bg-dark text-white border-secondary"
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className="bg-dark text-white border-secondary"
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            {formData.images.map((image, index) => (
                                <div key={index} className="mb-2">
                                    <div className="d-flex gap-2 mb-1">
                                        <Form.Control
                                            className="bg-dark text-white border-secondary"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, index)}
                                            required={index === 0}
                                        />
                                        {index > 0 && (
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removeImageField(index)}
                                            >
                                                ×
                                            </Button>
                                        )}
                                    </div>
                                    {image && (
                                        <img
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            style={{ maxWidth: '120px', maxHeight: '90px' }}
                                            className="img-thumbnail mt-1"
                                        />
                                    )}
                                </div>
                            ))}
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={addImageField}
                                className="mt-2"
                            >
                                + Add Image
                            </Button>
                        </Form.Group>

                        <Button
                            variant="outline-light"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-100 mt-3"
                        >
                            {isSubmitting ? (
                                <Spinner as="span" animation="border" size="sm" className="me-2" />
                            ) : null}
                            {isSubmitting ? 'Adding...' : 'Add Car'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddNewCar;