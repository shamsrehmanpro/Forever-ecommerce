import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import { shopContext } from '../context/ShopContext'

const LatestCollection = () => {
    const {products} = useContext(shopContext)
    const [LatestProducts, setLatestProducts] = useState([])

    useEffect(()=>{
        setLatestProducts(products.slice(0,10))
    },[products])

  return (
    <div className='my-10 '>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Sunt harum fugiat eligendi eos necessitatibus,
        </p>
      </div>

        {/* rendreing products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {LatestProducts.map((item, index)=>(
                 <ProductItem key={index} productId={item._id} image={item.image} price={item.price} name={item.name}  />
            ))}
        </div>

    </div>
  )
}

export default LatestCollection
