'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartContext } from '@/lib/cartContext';


const ProductDetail = (ctx) => {
    const [product, setProduct] = useState(null);
    const id = ctx.params.id
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCartContext()

    const addQuantity = (command) => {
        setQuantity(prev => {
            if (command === 'dec') {
                if (prev <= 1) return 1
                else return prev - 1
            }

            if (command === 'inc') {
                return prev + 1
            }
        })
    }

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`/api/product/${id}`); 
            setProduct(response.data);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        };
    
        fetchProduct();
      }, [id]);

  return (
    <section className='max-w-screen-xl mx-auto px-4 py-8'>
        {product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.imageUrl} alt={product.title} />
          <p>{product.desc}</p>
          <span className="text-[20px] text-[#333]">Price: <span className='text-orange-500 ml-2'>${product?.price}</span></span>
          <button  onClick={() => addToCart({...product, quantity})}>Add To Cart</button>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </section>
  )
}

export default ProductDetail