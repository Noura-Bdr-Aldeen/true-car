import React, { useState } from 'react';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import CardCar from './CardCar';
import { apiCars } from '../../../data';

const AllCars = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(3);

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = apiCars.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(apiCars.length / carsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container className="py-5">
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentCars.map((car) => (
                    <Col key={car.id}>
                        <CardCar car={car} />
                    </Col>
                ))}
            </Row>

            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <Pagination>
                        {pageNumbers.map((number) => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default AllCars;