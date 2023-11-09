import { createContext, useContext, useState } from "react";

const cartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])



    const addToCart = (newItem) => {
        setCartItems(prev => {
            const itemExists = cartItems.find((item) => item._id === newItem._id)

            if(itemExists){
                const updatedItem = {...itemExists, quantity: itemExists.quantity + newItem.quantity}

                const newArray = prev.map((item) => {
                    return item._id === newItem._id ? updatedItem : item
                })

                return newArray
            } else {
                return [...prev, newItem]
            }
        })
    }

    const removeCartItem = (cartItem) => {
        setCartItems((prev) => {
            return prev.filter((item) => item._id !== cartItem._id)
        })
    }

    return (
        <cartContext.Provider value={{
            cartItems,
            addToCart,
            removeCartItem
        }}>
            {children}
        </cartContext.Provider>
    )
}

export function useCartContext(){
    return useContext(cartContext)
}