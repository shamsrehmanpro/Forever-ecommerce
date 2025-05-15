import React, { useContext } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from '../Components/Title'

const Orders = () => {

  const { products, currency } = useContext(shopContext)
  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          products.slice(1, 4).map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col   md:flex-row md:items-center  gap-4'>
              <div className='flex items-start gap-6  text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              </div>
              <div>
                <p className='font-medium sm:text-base'>{item.name}</p>
                <div className='flex items-center mt-2 text-base gap-3 text-gray-700'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>25, july, 2020</span></p>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
