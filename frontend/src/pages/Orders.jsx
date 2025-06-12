import React, { useContext } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from '../Components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(shopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrderItems = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status,
              item['payment'] = order.payment,
              item['paymentMethod'] = order.paymentMethod,
              item['date'] = order.date,
              allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  {console.log(orderData);}
  
  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='flex items-center'>
              <div className='py-4 w-[100%] border-t border-b text-gray-700 flex flex-col   md:flex-row md:items-center  gap-[15%]'>

                <div className='py-4  text-gray-700 flex flex-col gap-4 w-[40%]   md:flex-row md:items-center '>
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
                    <p>Payment:&nbsp; <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>

                <div className='flex items-center w-[20%] gap-4'>
                  <div className='w-2 bg-green-500 h-2 rounded-[100%]'></div>
                  <p>{item.status}</p>
                </div>

                <div className='w-20%'>
                  <button className='border p-2 ' onClick={loadOrderData}>Track Order</button>
                </div>
              </div>


            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
