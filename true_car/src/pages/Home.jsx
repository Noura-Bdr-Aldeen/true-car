import React from 'react'
import CarouselSection from '../components/CarouselSection'
import HeroSection from '../components/HeroSection'
import MostWantedCar from "../components/card-wanted-car/MostWantedCar"
import WhyTrueCar from '../components/WhyTrueCar'
import EvaluationForm from '../components/EvaluationForm'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CarouselSection />
      <MostWantedCar />
      <WhyTrueCar />
      <EvaluationForm />
    </div>
  )
}
export default Home
