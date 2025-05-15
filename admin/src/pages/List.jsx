import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = () => {

  const [list, setList] = useState([])

  const fetchList = async()=>{
    const response = await axios.get(backendUrl+'/api/product/list')
    if (response.data.success) {
      setList(response.data.products)
    }else{
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div>
      
    </div>
  )
}

export default List
