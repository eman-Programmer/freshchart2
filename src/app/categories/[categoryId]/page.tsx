import { getCategories } from "@/api/services/categories.service";
import { CategoryType } from "@/api/types/category.types";
import ProductsByCategory from "@/app/_component/ProductsByCategory/ProductsByCategory";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import React from "react";

interface CategoryDetailsProps {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryDetails({
  params,
}: CategoryDetailsProps) {
  const { categoryId } = await params;

  const categoriesResponse = await getCategories();

  const category = categoriesResponse.data?.find(
    (item: CategoryType) => item.slug === categoryId
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm font-medium text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link className="hover:text-white transition-colors" href="/categories">
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">
              {category?.name ?? "Category Not Found"}
            </span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden relative">
              {category?.image ? (
                <Image
                  alt={category.name}
                  className="w-12 h-12 object-contain"
                  src={category.image}
                  width={48}
                  height={48}
                  priority
                />
              ) : (
                <Package className="w-8 h-8 text-white stroke-[1.75]" />
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category?.name ?? "Category Not Found"}
              </h1>
              <p className="text-white/80 font-medium mt-1">
                {category
                  ? `Browse products in ${category.name}`
                  : "The requested category could not be found"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Link
          className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-green-600 transition-colors mb-6"
          href="/categories"
        >
          ← Back to Categories
        </Link>

        {!category ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-centershadow-sm">
            <div className="w-20 h-20 mb-5 rounded-full bg-slate-100 flex items-center justify-center">
              <Package className="w-9 h-9 text-slate-400 stroke-[1.75]" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Category Not Found
            </h3>

            <p className="text-slate-500 text-sm mb-6">
              This category doesn't have any subcategories yet.
            </p>

            <Link
              href="/categories"
              className="bg-[#16a34a] hover:bg-[#16a344] text-white font-medium px-6 py-2.5 rounded-xl transition-colors duration-200 shadow-sm text-sm inline-flex items-center justify-center"
            >
              View All Categories
            </Link>
          </div>
        ) : (
          <ProductsByCategory
            categoryId={category._id}
            categoryName={category.name}
          />
        )}
      </div>
    </div>
  );
}