import { Carousel } from 'react-bootstrap';
import toyota from '../../src/assets/images/toyota.avif';
import nissan from '../../src/assets/images/nissan.avif';
import chevrolit from '../../src/assets/images/chevrolit.webp';
import bmw from '../../src/assets/images/bmw.avif';
import ford from '../../src/assets/images/ford.jpg';
import honda from '../../src/assets/images/honda.jpg';

const FastCompactCarousel = () => {
  const carImages = [
    { src: toyota, alt: "Toyota" },
    { src: nissan, alt: "Nissan" },
    { src: chevrolit, alt: "Chevrolet" },
    { src: bmw, alt: "BMW" },
    { src: ford, alt: "Ford" },
    { src: honda, alt: "Honda" }
  ];

  return (
    <div className="container mb-4 px-0" style={{ width: '750px' }}>
      <Carousel
        indicators={false}
        fade
        interval={1000}
        controls={false}
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
    </div>
  );
};

export default FastCompactCarousel;