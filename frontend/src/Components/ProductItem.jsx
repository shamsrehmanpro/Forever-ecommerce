import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { shopContext } from '../context/ShopContext'

const ProductItem = ({productId, image, name, price}) => {

    const {currency} = useContext(shopContext)
  return (
    <Link className='text-gray cursor-pointer' to={`/product/${productId}`} onClick={()=>window.scrollTo(0,0)}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
