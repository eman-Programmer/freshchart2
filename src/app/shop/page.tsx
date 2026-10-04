import React from "react";

import { Product } from "@/api/types/productTypes";
import {
  getAllProducts,
  getProductsByBrand,
} from "@/api/services/productApi";

import ProductCard from "../_component/productcard/productCard";
import Link from "next/link";

type ShopProps = {
  searchParams: Promise<{
    brand?: string;
  }>;
};

export default async function Shop({ searchParams }: ShopProps) {
  const { brand } = await searchParams;

  let products: Product[];

  if (brand) {
    
    products = await getProductsByBrand(brand);
  } else {
    products = await getAllProducts();
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">

      <section className="w-full bg-[#20c05b] text-white px-6 py-12 md:px-12 lg:px-16">
        <div className="w-full max-w-[1600px] mx-auto">

         
          <div className="text-sm text-green-100 mb-5 flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/shop"
              className="font-semibold text-white hover:text-green-100 transition-colors"
            >
              {brand ? "Brand Products" : "All Products"}
            </Link>
          </div>

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {brand ? "Brand Products" : "All Products"}
              </h1>

              <p className="text-green-100 text-sm md:text-base mt-1">
                {brand
                  ? "Products from the selected brand"
                  : "Explore our complete product collection"}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Products */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mt-8">

        <div className="w-full max-w-[1600px] mx-auto">

          <p className="text-slate-600 font-medium text-sm mb-6">
            Showing {products.length} products
          </p>

          {products.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

          ) : (

            <div className="text-center py-20">

              <h2 className="text-xl font-semibold text-gray-700">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-2">
               No products match your current filters.
              </p>

              <Link
                href="/shop"
                className="inline-block mt-6 bg-[#20c05b] text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
              >
                View All Products
              </Link>

            </div>

          )}

        </div>
      </section>
    </main>
  );
}

