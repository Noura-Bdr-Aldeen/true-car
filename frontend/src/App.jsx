
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home"
import Cars from "./pages/Cars"
import CarDetails from "../src/pages/carDetails/CarDetails"
import AdvertisementDetails from "../src/pages/AdvertisementDetails"
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars/:id" element={<AdvertisementDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
