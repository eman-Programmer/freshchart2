import React from "react";
import { getAllProducts } from "@/api/services/productApi";
import ProductCard from "../productcard/productCard";
import Link from 'next/link';
import { Package } from 'lucide-react';

export default async function ProductsByCategory({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const data = await getAllProducts();

  const filteredProducts = data.filter(
    (product: any) => product.category?._id === categoryId
  );

  return (
    <section className="py-4">

      <div className="flex items-center gap-3 mb-8">

        <span className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full shrink-0"></span>

        <h2 className="text-3xl font-bold text-gray-800">
          {categoryName}
        </h2>

      </div>

      {filteredProducts.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filteredProducts.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      ) : (

       <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      
      <div className="w-20 h-20 mb-5 rounded-full bg-slate-100 flex items-center justify-center">
        <Package className="w-9 h-9 text-slate-400 stroke-[1.75]" />
      </div>

     
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No Products Found
      </h3>

     
      <p className="text-slate-500 text-sm mb-6">
        No products match your current filters.
      </p>

      <Link
        href="/shop"
        className="bg-[#16a34a] hover:bg-[#16a344] text-white font-medium px-6 py-2.5 rounded-xl transition-colors duration-200 shadow-sm text-sm inline-flex items-center justify-center"
      >
        View All Products
      </Link>
    </div>

      )}

    </section>
  );
}