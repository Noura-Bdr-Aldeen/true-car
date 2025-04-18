import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert, Spinner, Modal } from 'react-bootstrap';
import axios from 'axios';
import { api } from '../api/constant';

const AdvertisementForm = ({ authToken, cars }) => {
    const [formData, setFormData] = useState({
        car_id: '',
        title: '',
        description: '',
        images: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showPreview, setShowPreview] = useState(false);

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

            await axios.post(`${api}/vehicle-ads`, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create advertisement. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="text-center">
                <Alert variant="success" className="mb-4">
                    <h4>Advertisement Submitted Successfully!</h4>
                    <p>Your ad is under review. You'll be notified once it's approved.</p>
                </Alert>
                <Button variant="primary" onClick={() => {
                    setSuccess(false);
                    setFormData({
                        car_id: '',
                        title: '',
                        description: '',
                        images: []
                    });
                    setImageFiles([]);
                }}>
                    Create Another Advertisement
                </Button>
            </div>
        );
    }

    return (
        <Card className="shadow">
            <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Create New Advertisement</h4>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Vehicle</Form.Label>
                                <Form.Select
                                    name="car_id"
                                    value={formData.car_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Choose a vehicle</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.id}>
                                            {car.brand} {car.model} ({car.year})
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Advertisement Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Excellent Condition 2020 Toyota Camry"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the vehicle in detail..."
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label>Images (Max 6)</Form.Label>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={addImageField}
                                disabled={formData.images.length >= 6}
                            >
                                + Add Image
                            </Button>
                        </div>

                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {formData.images.map((image, index) => (
                                <div key={index} className="mb-3 p-2 border rounded">
                                    <div className="d-flex gap-2 mb-2">
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, index)}
                                            required={index === 0}
                                        />
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => removeImageField(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    {image && (
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                                style={{
                                                    width: '120px',
                                                    height: '80px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer'
                                                }}
                                                className="img-thumbnail me-2"
                                                onClick={() => setShowPreview(image)}
                                            />
                                            <small className="text-muted">Image {index + 1}</small>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    <div className="d-grid">
                        <Button
                            variant="primary"
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                                    Submitting...
                                </>
                            ) : 'Submit Advertisement'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>

            {/* Image Preview Modal */}
            <Modal show={!!showPreview} onHide={() => setShowPreview(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img
                        src={showPreview}
                        alt="Full Preview"
                        style={{ maxWidth: '100%', maxHeight: '70vh' }}
                        className="img-fluid"
                    />
                </Modal.Body>
            </Modal>
        </Card>
    );
};

export default AdvertisementForm;