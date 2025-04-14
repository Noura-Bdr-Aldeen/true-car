import "./CardMostWantedCar.css"
import { Container } from 'react-bootstrap'
import { Link } from "react-router-dom"

const CardMostWantedCar = ({ car }) => {
    return (
        <Container className="py-4">
            <div className="card-car">
                <div className="card-car-details">
                    <Link to={`/car-details/${car.id}`}>
                        <div style={{
                            backgroundImage: `url(${car.image})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            width: "250px",
                            height: "180px",
                            marginBottom: "10px"
                        }}></div>
                    </Link>
                    <p className="text-title">{car.make}</p>
                    <p className="text-body">{car.model}</p>
                    <p className="text-body">{car.engine}</p>
                </div>
                <Link to={`/car-details/${car.id}`}><button className="card-car-button">More info</button></Link>
            </div>
        </Container>
    )
}

export default CardMostWantedCar
