'use client'
import React from 'react'
import { useCartContext } from '@/lib/cartContext'
import { AiOutlineClose } from 'react-icons/ai'
import { loadStripe } from '@stripe/stripe-js'



const Cart = () => {
    const {cartItems, removeCartItem} = useCartContext()
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

    
    const handleCheckout = async () => {
        const lineItems = cartItems.map((book) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: book.title
                    },
                    unit_amount: book.price * 100
                },
                quantity: book.quantity
            }
        })

        const res = await fetch("http://localhost:3000/api/checkout", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(lineItems)
        })

        const data = await res.json()

        const stripe = await stripePromise

        await stripe.redirectToCheckout({ sessionId: data.id })
    }

 
  return (
    <section className='px-4 py-8 max-w-screen-xl mx-auto'>
<div>
        <h2 className="text-center text-2xl">Cart Items</h2>
        <div className="max-h-[225px] overflow-auto flex flex-col gap-8 my-8">
          {cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <div key={item._id} className='flex items-center gap-8'>
                <div>
                  <img width='75' height='75' src={item.imageUrl} alt="" />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.quantity} X ${item.price}</span>
                </div>
                <AiOutlineClose size={20} onClick={() => removeCartItem(item)}/>
              </div>
            ))
          ) : <span className="text-red-500 ml-2">Cart is empty!</span>}
        </div>
        <span className="inline-block">Total: <span>${cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}</span></span>
        <span className="block max-w-max mt-8 px-6 py-1 bg-orange-500 text-[#efefef] rounded-lg" onClick={handleCheckout}>Checkout</span>
      </div>


    </section>
  )
}

export default Cart