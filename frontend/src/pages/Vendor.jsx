import { Container, Tab, Nav, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api/constant";
import AddNewCar from "../components/AddNewCar";
import AdvertisementForm from "../components/AdvertisementForm";
import car from "../assets/images/car-hd.jpg";

const Vendor = ({ authToken }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('add-car');

    useEffect(() => {
        const fetchVendorCars = async () => {
            try {
                const response = await axios.get(`${api}/users/${userId}/cars`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                setCars(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load your vehicles');
            } finally {
                setLoading(false);
            }
        };

        fetchVendorCars();
    }, [authToken]);

    return (
        <div className="bg-dark-subtle" style={{ minHeight: '100vh'}}>
            <Container fluid className="pt-5 pb-5">
                <h2 className="text-center mb-5 text-black">Vendor Dashboard</h2>

                <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                    <Row className="justify-content-center mb-4">
                        <Col md={10} lg={8}>
                            <Nav variant="tabs" className="justify-content-center gap-3">
                                <Nav.Item>
                                    <Nav.Link
                                        className="nav-tab"
                                        eventKey="add-car">Add New Car</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        className="nav-tab"
                                        eventKey="create-ad">Add Advertisement</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={10} lg={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="add-car">
                                    <div style={{
                                        backgroundImage: `url(${car})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '100%',
                                        minHeight: '100vh',
                                        padding: '2rem',
                                        borderRadius: '0.5rem'
                                    }}>
                                        <AddNewCar authToken={authToken} />
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="create-ad">
                                    {/* {loading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : error ? (
                                        <div className="alert alert-danger">{error}</div>
                                    ) : cars.length > 0 ? ( */}
                                        <AdvertisementForm authToken={authToken} cars={cars} />
                                    {/* ) : (
                                        <div className="alert alert-warning">
                                            You need to add vehicles first before creating advertisements.
                                        </div>
                                    )} */}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </div>
    );
};

export default Vendor;