import React from 'react';
import heroImage from "../assets/images/hero-image.jpg";
import Carousel from "./Carousel";
import { Container } from 'react-bootstrap';

const Hero = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px'
            }}
        >
            <Container fluid className="d-flex justify-content-end">
                <div>
                    <Carousel />
                </div>
            </Container>
        </div>
    );
};

export default Hero;