import { Link } from 'react-router-dom'
import logo from "../assets/images/logo.avif"
import Search from './Search'
import { IoPersonCircle } from "react-icons/io5";


const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-black px-5">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}><img src={logo} alt="..." /></Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item nav-item-style px-2">
                                <Link to="/cars" className="nav-link text-light text-decoration-none">
                                    All Cars
                                </Link>
                            </li>

                            <li className="nav-item px-2">
                                <a className="nav-link disabled"
                                    style={{ color: "#D325A6" }}
                                    aria-disabled="true">Sill your car</a>
                            </li>
                            <li className="nav-item px-2">
                            </li>
                        </ul>
                        <Search />
                        <Link to="/login" className='text-decoration-none' color='info'>
                            <IoPersonCircle size={40} />
                        </Link>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default NavBar
