import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { shopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(shopContext)

  const [method, setMethod] = useState('cod')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            let itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
     
      switch (method) {
        //api call for COD
        case 'cod':
          
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          console.log(response.data)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            console.log(error)
            toast.error(response.data.error)
          }
          break;

          case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            console.log(session_url);
            
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message )
          }
          break;

        default:
          break;
      }

      console.log(orderItems)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* --------------------Left side------------------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl my-3 sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zip code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* ------------------------------Right side------------ */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ----------------payment method selection----------------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : null}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('razor')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razor' ? 'bg-green-400' : null}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : null} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 cursor-pointer text-sm'>PLACE ORDER</button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
