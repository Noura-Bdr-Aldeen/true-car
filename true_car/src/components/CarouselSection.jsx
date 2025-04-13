import Carousel from "./Carousel";
import { Container } from 'react-bootstrap';

const CarouselSection = () => {
    return (
        <div className="bg-black">
            <Container fluid className="d-flex justify-content-center py-5">
                <Carousel />
            </Container>
        </div>
    );
};

export default CarouselSection;