import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const CardCar = ({ car }) => {
    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <div
                style={{
                    backgroundImage: `url(${car.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '18rem',
                    height: '180px',
                    marginBottom: '10px',
                }}
            ></div>
            <Card.Body>
                <Card.Title>{car.make}</Card.Title>
            </Card.Body>

            <ListGroup className="list-group-flush">
                <ListGroup.Item>{car.model}</ListGroup.Item>
                <ListGroup.Item>{car.year}</ListGroup.Item>
            </ListGroup>

            <Card.Body>
                <Link className="btn btn-primary" to={`/car-details/${car.id}`}>
                    More info
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CardCar;