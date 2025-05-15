import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const shopContext = createContext();

const shopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()

    const addToCart = (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size')
            return
        }
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartItems) {
            let info = products.find((product) => product._id === item)
            if (info) {
                for (const size in cartItems[item]) {
                    totalCount += cartItems[item][size]
                }
            }
        }
        return totalCount
    }


    



    const getCartAmount = () => {

        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                totalAmount += itemInfo.price * cartItems[items][item]
            }
            return totalAmount
            console.log(totalAmount);
            

        }


        // for(const item in cartItems){

        //     for(const items in cartItems[item]){
        //         let largeSize = cartItems[item]["L"];
        //         let mediumSize = cartItems[item]["M"]
        //         let xlargeSize = cartItems[item]["XL"]

        //         let totalSize  = (largeSize || 0) + (mediumSize || 0) + (xlargeSize || 0);  
        //        const findPrice = products.find((product)=>product._id === item)

        //        let totalAmount = findPrice.price * totalSize
        //         console.log(totalAmount);

        //     }
        // }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
    }


    useEffect(() => {
        console.log(cartItems)
       
    }, [cartItems])

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch, showSearch, setShowSearch, cartItems, setCartItems,
        addToCart, getCartCount, updateQuantity, getCartAmount, navigate
    }

    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}

export default shopContextProvider