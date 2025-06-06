import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import Newsletterbox from '../Components/Newsletterbox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title  text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600 '>Our Store</p>
          <p className='text-gray-500'>5494 william station <br />suite 350, washington, US</p>
          <p className='text-gray-500'>Tel: (342) 555-444 <br />Email: admin@forever.com</p>
          <p className='text-gray-600 font-semibold text-xl'>Carrers at forever</p>
          <p className='text-gray-500 '>Learn more about over team and job opening</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-500'>Explore Jobs</button>

        </div>
      </div>
      <Newsletterbox />
    </div>
  )
}

export default Contact
