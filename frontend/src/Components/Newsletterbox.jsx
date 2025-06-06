import React from 'react'

const Newsletterbox = () => {
    const onSubmitHandler = ()=>{
        event.preventDefault()
    }


  return (
    <div onSubmit={onSubmitHandler} className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, recusandae!
      </p>
      <form action="" className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletterbox
