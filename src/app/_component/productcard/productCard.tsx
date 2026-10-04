import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import AddBtn from '../AddBtn/AddBtn';
import { Product } from "@/api/types/productTypes"
import { AddToWishlistButton } from '../Wishlist/Wishlist';

export default function ProductCard({ product }: { product: Product })  {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:translate-[-2px]
    transition-shadow relative max-w-[280px]">
      
     
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <AddToWishlistButton productId={product._id} />

        <button className="w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center hover:text-green-500 text-gray-600 transition-colors">
          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button className="w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center hover:text-green-500 text-gray-600 transition-colors">
         
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>

      
      <div className="relative w-full h-70 mb-4">
        <Link href={`/productDetails/${product._id}`}>
        <Image
          src ={product.imageCover}
          alt={product.title}
          fill
          className="object-contain"
        /></Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1">
        <span className="text-slate-500 text-xs font-medium">
          {product.category?.name}
        </span>

        
        <h3 className="text-slate-800 font-semibold text-base line-clamp-1">
          {product.title}
        </h3>

        
        <div className="flex items-center gap-1 my-1">
          <div className="flex text-amber-400">
            
            {[...Array(4)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
            ))}
            
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span className="text-slate-600 text-xs font-medium ml-1">
            {product.ratingsAverage} ({product.ratingsQuantity || 38})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-slate-900 font-bold text-lg">
              {product.price || product.price} EGP
            </span>
            {product.price && (
              <span className="text-gray-400 text-xs line-through">
                {product.price} EGP
              </span>
            )}
          </div>
      <AddBtn
  prodId={product._id}
  child={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v16m8-8H4"
      />
    </svg>
  }
  cls="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-sm transition-colors"
/>

          
        </div>
      </div>
    </div>
  );
}