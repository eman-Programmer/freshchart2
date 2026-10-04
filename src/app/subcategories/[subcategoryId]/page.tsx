import { Package } from "lucide-react";

export default function SubcategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">

      <div className="container mx-auto px-4 py-10">

        <div className="flex flex-col items-center justify-center py-16 text-center">

          <Package className="w-12 h-12 text-gray-400 mb-4" />

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Subcategories Found
          </h3>

          <p className="text-gray-500">
            There are no subcategories for this category.
          </p>

        </div>

      </div>

    </div>
  );
}