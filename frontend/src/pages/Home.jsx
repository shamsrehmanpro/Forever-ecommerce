import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import Title from '../Components/Title'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import Newsletterbox from '../Components/Newsletterbox'

const Home = () => {

  
  return (
    <div>
      <Hero/>
      <LatestCollection />
      <BestSeller/>
      <OurPolicy/>
      <Newsletterbox/>
    
    </div>
  )
}

export default Home
