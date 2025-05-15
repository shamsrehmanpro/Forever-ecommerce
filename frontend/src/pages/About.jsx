import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import Newsletterbox from '../Components/Newsletterbox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
         <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore corrupti exercitationem rem nobis, accusamus veritatis possimus odio. Repellendus cumque rerum eveniet soluta nobis error blanditiis, at excepturi omnis
         vel ipsa incidunt suscipit. Facere illum voluptas necessitatibus molestiae eligendi adipisci
          harum.
          </p> 
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus 
          temporibus hic sapiente fuga molestias sint, maxime magni inventore fugit a?   temporibus hic
           sapiente fuga molestias sint, maxime magni inventore fugit a?
           </p>
           <b className='text-gray-800 '>Our Mission</b>
           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed magni
             iusto vitae dolor nulla consequatur cum ea illo dolores quos!
             </p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Recusandae repellendus sed dolores expedita quas porro repellat facilis obcaecati rem rerum.
            </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Recusandae repellendus sed dolores expedita quas porro repellat facilis obcaecati rem rerum.
            </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Recusandae repellendus sed dolores expedita quas porro repellat facilis obcaecati rem rerum.
            </p>
        </div>
      </div>
    <Newsletterbox />
      
    </div>
  )
}

export default About
