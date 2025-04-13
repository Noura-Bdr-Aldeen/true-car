
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home"
import CarDetails from "../src/pages/CarDetails"
import Footer from './components/Footer';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
