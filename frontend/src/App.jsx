import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Components/Searchbar'
import Verify from './pages/Verify'

const App = () => {
  
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7px] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <Searchbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
