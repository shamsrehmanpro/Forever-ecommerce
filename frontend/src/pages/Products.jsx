import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'

import RelatedProduct from '../Components/RelatedProduct'
import { shopContext } from '../context/ShopContext';

const Products = () => {

  const {productId} = useParams()
  const {products, currency, cartItems, setCartItems, addToCart} = useContext(shopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

 const fetchProductData = ()=>{
  const product = products.find((p)=> p._id === productId)
  setProductData(product)
  setImage(product.image[0])
 }

  useEffect(()=>{
    if (products.length > 0) {
       fetchProductData();
    }
   
  },[products, productId, productData])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* -----------product images---------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
           { productData.image.map((item, index)=>(
            <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
           ))}
          </div>

           <div className='w-full sm:w-[80%] '>
            <img src={image} alt="" className='w-full h-auto'/>
           </div>
        </div>

        {/* ---------------product information --------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} key={index} className={`${size===item ? 'border-orange-500' :""} border cursor-pointer bg-gray-100 px-4 gap-4 py-2`}>{item}</button>
              ))}
            </div>
            <button onClick={()=>addToCart(productData._id, size)} className='bg-black cursor-pointer active:bg-gray-700 text-white w-[40%] h-[20%] py-3 rounded mt-4'>ADD TO CART</button>
              <hr className='mt-8 mb-0 sm:w-4/5'/>
          </div>
          <div className='mt-0 text-gray-500 md:w-4/5'>
            <p>100% Orignal Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className='mt-22'>
            <div className='flex'>
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className='border px-5 py-3 text-sm'>Reviews {122}</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sint qui 
                commodi fugiat aliquam cupiditate maxime nemo temporibus beatae officiis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sint qui 
                commodi fugiat aliquam cupiditate maxime nemo temporibus beatae officiis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sint qui 
                commodi fugiat aliquam cupiditate maxime nemo temporibus beatae officiis.
                </p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut dolorem sapiente error optio consequuntur. Tempore delectus repellendus quasi quia perferendis velit quam! Quod dolorem, autem reprehenderit delectus
                   fugit tempore consectetur unde repudiandae libero aut eos earum, molestiae doloremque cum dicta.
                </p>
            </div>
      </div>

      {/* Display related product */}
      {<RelatedProduct category={productData.category} subCategory={productData.subCategory}/>}

    </div>
  ) : <div className='opacity-0'></div>
}

export default Products
