'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { WishlistProvider } from "../Wishlist/Wishlist";
export default function MyProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </SessionProvider>
  )
}