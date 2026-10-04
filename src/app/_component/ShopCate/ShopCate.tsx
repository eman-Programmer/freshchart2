import React from "react";
import Link from "next/link";
import { getShopCate } from "@/api/services/productApi";

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug?: string;
}

export default async function ShopCate() {
  const categories: Category[] = await getShopCate();

  return (
    <section className="my-10 px-4 mx-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 bg-emerald-600 rounded-full shrink-0"></span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Shop By <span className="text-emerald-600">Category</span>
          </h2>
        </div>

        <Link
          href="/categories"
          className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm sm:text-base flex items-center gap-1 transition-colors"
        >
          View All Categories <span className="text-lg">&rarr;</span>
        </Link>
      </div>

     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
          >

            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 mb-4 flex items-center justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h3 className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors text-center line-clamp-1">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}