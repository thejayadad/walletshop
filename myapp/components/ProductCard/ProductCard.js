'use client'

import Link from 'next/link'
import React from 'react'

const ProductCard = ({product: {title, desc, _id, imageUrl}}) => {
  return (
    <Link
    href={`/product/${_id}`}
    className='h-80 w-24 items-center flex flex-col'
    >
            <img 
            className='h-80 w-48'
    src={imageUrl}
    alt={title}
    />
    <h3>{title}</h3>
    </Link>
  )
}

export default ProductCard