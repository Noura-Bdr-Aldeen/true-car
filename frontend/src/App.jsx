
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home"
import Cars from "./pages/Cars"
import CarDetails from "../src/pages/carDetails/CarDetails"
import AdvertisementDetails from "../src/pages/AdvertisementDetails"
import Footer from './components/Footer';
import NavBar from './components/NavBar';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars/:id" element={<AdvertisementDetails />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
