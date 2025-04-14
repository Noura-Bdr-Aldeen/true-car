import React from 'react'
import CarouselSection from '../components/CarouselSection'
import HeroSection from '../components/HeroSection'
import MostWantedCar from "../components/card-wanted-car/MostWantedCar"
import WhyTrueCar from '../components/WhyTrueCar'
import EvaluationForm from '../components/EvaluationForm'
import Advertisement from '../components/Advertisement'
import BrandSection from "../components/BrandSection"

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CarouselSection />
      <MostWantedCar />
      <BrandSection/>
      <Advertisement />
      <WhyTrueCar />
      <EvaluationForm />
    </div>
  )
}
export default Home
