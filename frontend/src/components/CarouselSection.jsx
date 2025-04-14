import { Carousel, Container } from 'react-bootstrap';
import toyota from '../../src/assets/images/toyota.avif';
import nissan from '../../src/assets/images/nissan.avif';
import chevrolit from '../../src/assets/images/chevrolit.webp';
import bmw from '../../src/assets/images/bmw.avif';
import ford from '../../src/assets/images/ford.jpg';
import honda from '../../src/assets/images/honda.jpg';

const CarouselSection = () => {
  const carImages = [
    { src: toyota, alt: "Toyota" },
    { src: nissan, alt: "Nissan" },
    { src: chevrolit, alt: "Chevrolet" },
    { src: bmw, alt: "BMW" },
    { src: ford, alt: "Ford" },
    { src: honda, alt: "Honda" }
  ];

  return (
    <div className='bg-black'>
      <Container className="py-4" style={{ width: '800px' }}>
        <h2 className='text-center text-success p-4'>Shop your favorite brand</h2>
        <Carousel
          fade
          interval={2000}
        >
          {carImages.map((image, index) => (
            <Carousel.Item key={index}>
              <div className="position-relative" style={{ height: '400px' }}>
                <img
                  className="img-fluid rounded shadow w-100 h-100"
                  src={image.src}
                  alt={image.alt}
                  style={{
                    objectFit: 'cover',
                    padding: '1px',
                  }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-2"
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    borderBottomLeftRadius: '0.375rem',
                    borderBottomRightRadius: '0.375rem'
                  }}>
                  <h6 className="text-center text-white m-0">{image.alt}</h6>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      </div>
  );
};

export default CarouselSection;