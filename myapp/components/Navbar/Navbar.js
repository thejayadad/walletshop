'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartContext } from '@/lib/cartContext'

const Navbar = () => {
    const {data: session} = useSession()
    const { cartItems } = useCartContext()


  return (
    <header className='px-4 py-8'>
        <div className='flex max-w-screen-xl mx-auto justify-between'>
            <Link href={'/'}>WalletShare</Link>
            <div className='flex'>
                {
                    session?.user
                    ? (
                        <div className='flex gap-4 items-center'>
                            <Link href={'/cart'}>
                                <span>{cartItems?.length    }</span>
                            <AiOutlineShoppingCart />
                            </Link>
                            <Link href={'/cart'}>
                            <AiOutlineHeart />
                            </Link>
                            <span>{session?.user.email}</span>
                          <button onClick={() => {signOut()}}>Logout</button>
                        </div>
                    ) : (
                        <>
                        <Link href={'/register'}>Register</Link>
                        <Link href={'/login'}>Login</Link>
                        </>
                    )
                }
            </div>
        </div>
    </header>
  )
}

export default Navbar