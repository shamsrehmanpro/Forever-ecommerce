import React, { useContext, useState } from 'react'
import { products } from '../assets/assets'
import Title from './Title'
import ProductItem from './ProductItem'
import { shopContext } from '../context/ShopContext'

const BestSeller = () => {
    const {products} = useContext(shopContext)
    const [bestSeller, setBestSeller] = useState([])


    useState(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller))
        setBestSeller(bestProduct.slice(0,5))
    },[])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi a dolores 
            voluptatibus totam veritatis reprehenderit sit, dolorem voluptate quasi quo.
            </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index)=>(
            <ProductItem key={index} productId={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}
      </div>
    </div>
  )
}

export default BestSeller
