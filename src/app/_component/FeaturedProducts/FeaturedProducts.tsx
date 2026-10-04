import React from 'react'
import { getAllProducts} from '@/api/services/productApi'
import ProductCard from  '../productcard/productCard'

export default async function FeaturedProducts() {

const data = await getAllProducts();
  return (
    <>
<div className="flex items-center gap-3 my-8 mx-10 ">
  <span className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full shrink-0"></span>
  <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
    Featured <span className="text-emerald-600">Products</span>
  </h2>
</div>


    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2  mx-10">
      {data.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
 </> )
}
