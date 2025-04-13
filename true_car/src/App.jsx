
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home"
import Cars from "./pages/Cars"
import CarDetails from "../src/pages/carDetails/CarDetails"
import Footer from './components/Footer';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
