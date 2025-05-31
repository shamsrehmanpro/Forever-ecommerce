import React, { useContext, useEffect, useState } from 'react'

import { assets } from '../assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'
import { shopContext } from '../context/ShopContext'

const Collection = () => {

  const {products, search} = useContext(shopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e)=>{
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev=>[...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    if (subcategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item=> item !== e.target.value))
    }
    else{
      setSubCategory(prev=>[...prev, e.target.value])
    }
  }

  const filterSearch = ()=>{
    let pfCopy = products.slice()
    let filter =  pfCopy.filter((item)=>
    item.name.toLowerCase().includes(search.toLowerCase()))
    setFilterProducts(filter)
  }

  useEffect(()=>{
    filterSearch()
  },[search])

  //for check box

  const applyFilter = ()=>{
    let productsCopy = products.slice()
    if (category.length>0) {
      productsCopy = productsCopy.filter(item=> category.includes(item.category))
    }
    if (subcategory.length>0) {
      productsCopy = productsCopy.filter(item=>subcategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  // const handleSort = (e)=>{
  //   const value = e.target.value
  //   let productsCopy = filterProducts.slice()
  //   if (value==='low-high') {
  //      productsCopy.sort((a,b)=>a.price-b.price)
  //   }
  //   else if(value === 'high-low'){
  //     productsCopy.sort((a,b)=>b.price-a.price)
  //   }
      
  //   setFilterProducts(productsCopy)
  // }

  const sortProduct = (e)=>{
    let fpCopy = filterProducts.slice()
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;
        case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
        break;
    
      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    sortProduct()
  },[sortType])

  useEffect(()=>{
    applyFilter()
  },[category, subcategory, products])




  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* filter options */}
      <div className='min-w-60'>
          <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 '>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
          </p>
          
          {/* category filter */}
          <div className= {`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input onChange={toggleCategory} type="checkbox" className='w-3' value={'Men'} />Men
              </p>
              <p className='flex gap-2'>
                <input onChange={toggleCategory} type="checkbox" className='w-3' value={'Women'} />Women
              </p>
              <p className='flex gap-2'>
                <input onChange={toggleCategory} type="checkbox" className='w-3' value={'Kids'} />Kids
              </p>
            </div>
          </div>
          {/* subcategory filter */}
          <div className= {`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium '>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" onChange={toggleSubCategory} className='w-3' value={'Topwear'} />Topwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" onChange={toggleSubCategory} className='w-3' value={'Winterwear'} />Winterwear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" onChange={toggleSubCategory} className='w-3' value={'Bottomwear'} />Bottomwear
              </p>
            </div>
          </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* map products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item, index)=>(
                <ProductItem key={index} productId={item._id} name={item.name} price={item.price} image={item.image}/>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Collection
