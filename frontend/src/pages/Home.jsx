import React from 'react'
import Carousel from '../components/Carousel'
import HeroSection from '../components/HeroSection'
import MostWantedCar from "../components/card-wanted-car/MostWantedCar"
import WhyTrueCar from '../components/WhyTrueCar'
import EvaluationForm from '../components/EvaluationForm'
import Advertisement from '../components/Advertisement'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Carousel />
      <MostWantedCar />
      <Advertisement />
      <WhyTrueCar />
      <EvaluationForm />
    </div>
  )
}
export default Home
