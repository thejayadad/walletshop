'use client'
import ProductCard from "../ProductCard/ProductCard"
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('/api/product'); 
          setProducts(response.data); 
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);

  return (
    <section className="px-4 py-8 max-w-screen-xl mx-auto">
        <h2 className="text-center">All Wallets</h2>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
