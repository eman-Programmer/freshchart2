"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Product } from "@/api/types/productTypes";

import {
  addProductToWishlist,
  getUserWishlist,
  removeProductFromWishlist,
} from "@/api/actions/wishlist.actions";

import AddBtn from "../AddBtn/AddBtn";

interface WishlistContextType {
  numOfWishlistItems: number;
  wishlistItems: string[];
  updateWishlist: (items: string[]) => void;
}

export const WishlistContext = createContext<WishlistContextType>({
  numOfWishlistItems: 0,
  wishlistItems: [],
  updateWishlist: () => {},
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const { data: session } = useSession();

  function updateWishlist(items: string[]) {
    setWishlistItems(items);
    setNumOfWishlistItems(items.length);
  }

  useEffect(() => {
    if (!session?.user) {
      updateWishlist([]);
      return;
    }

    getUserWishlist().then((data) => {
      if (data.status === "success") {
        const items = data.data?.map((item: Product) => item._id) || [];
        updateWishlist(items);
      }
    });
  }, [session]);

  return (
    <WishlistContext.Provider
      value={{
        numOfWishlistItems,
        wishlistItems,
        updateWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

export function AddToWishlistButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { wishlistItems, updateWishlist } = useWishlist();
  const isInWishlist = wishlistItems.includes(productId);

  async function handleWishlist() {
    setIsLoading(true);

    try {
      const res = isInWishlist
        ? await removeProductFromWishlist(productId)
        : await addProductToWishlist(productId);

      if (res.status === "success") {
        updateWishlist(res.data || []);
        toast.success(
          res.message ||
            (isInWishlist ? "Removed from wishlist" : "Added to wishlist")
        );
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={isLoading}
      className={`w-9 h-9 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center transition-colors ${
        isInWishlist ? "text-red-500" : "text-gray-600 hover:text-red-600"
      }`}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={isInWishlist ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364 4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
}

export function AddToWishlistDetailsButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { wishlistItems, updateWishlist } = useWishlist();
  const isInWishlist = wishlistItems.includes(productId);

  async function handleWishlist() {
    setIsLoading(true);

    try {
      const res = isInWishlist
        ? await removeProductFromWishlist(productId)
        : await addProductToWishlist(productId);

      if (res.status === "success") {
        updateWishlist(res.data || []);
        toast.success(
          res.message ||
            (isInWishlist ? "Removed from wishlist" : "Added to wishlist")
        );
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={isLoading}
      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
        isInWishlist
          ? "text-red-500 border-red-200 bg-red-50"
          : "text-gray-600 border-gray-200 hover:text-red-500"
      }`}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill={isInWishlist ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364 4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
}

export function RemoveProductWishlist({
  productId,
  setIsLoading,
}: {
  productId: string;
  productTitle?: string;
  setIsLoading?: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const { updateWishlist } = useWishlist();

  async function handleRemove() {
    setLoading(true);
    setIsLoading?.(true);

    try {
      const res = await removeProductFromWishlist(productId);

      if (res.status === "success") {
        updateWishlist(res.data || []);
        toast.success(res.message || "Product removed from wishlist");
      } else {
        toast.error(res.message || "Failed to remove product");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsLoading?.(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={loading}
      className="w-10 h-10 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all flex items-center justify-center shrink-0"
      title="Remove from wishlist"
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
}

export function WishlistProductCard({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors relative ${
        isLoading ? "opacity-60" : ""
      }`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 rounded-2xl flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-600">
              Updating...
            </span>
          </div>
        </div>
      )}

      <div className="md:col-span-6 flex items-center gap-4">
        <Link
          className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 relative"
          href={`/productDetails/${product._id}`}
        >
          <Image
            alt={product.title}
            className="w-full h-full object-contain p-2"
            src={product.imageCover}
            width={80}
            height={80}
          />
        </Link>

        <div className="min-w-0">
          <Link
            className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
            href={`/productDetails/${product._id}`}
          >
            {product.title}
          </Link>

          <p className="text-sm font-medium text-gray-400 mt-1">
            {product.category?.name}
          </p>
        </div>
      </div>

      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
        <span className="md:hidden text-sm text-gray-500">Price:</span>

        <div className="text-right md:text-center">
          <div className="font-semibold text-gray-900">
            {product.price
              ? product.price
              : product.price}{" "}
            EGP
          </div>

          {product.price && (
            <div className="text-sm font-medium text-gray-400 line-through">
              {product.price} EGP
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2 flex md:justify-center">
        <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            product.quantity > 0
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              product.quantity > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>

          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
        {product.quantity > 0 ? (
          <AddBtn
            prodId={product._id}
            child={
              <>
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5625 0C0.250781 0 0 0.250781 0 0.5625C0 0.874219 0.250781 1.125 0.5625 1.125H1.62422C1.71563 1.125 1.79297 1.19062 1.80937 1.27969L3.03047 7.98984C3.17578 8.79141 3.87422 9.375 4.68984 9.375H10.6875C10.9992 9.375 11.25 9.12422 11.25 8.8125C11.25 8.50078 10.9992 8.25 10.6875 8.25H4.68984C4.41797 8.25 4.18594 8.05547 4.13672 7.78828L4.01719 7.125H11.1328C11.8547 7.125 12.4734 6.61172 12.607 5.90156L13.3336 2.01328C13.4203 1.55156 13.0664 1.125 12.5953 1.125H2.92266L2.91328 1.07812C2.80078 0.454687 2.25703 0 1.62187 0H0.5625ZM4.875 12.375C5.17337 12.375 5.45952 12.2565 5.6705 12.0455C5.88147 11.8345 6 11.5484 6 11.25C6 10.9516 5.88147 10.6655 5.6705 10.4545C5.45952 10.2435 5.17337 10.125 4.875 10.125C4.57663 10.125 4.29048 10.2435 4.0795 10.4545C3.86853 10.6655 3.75 10.9516 3.75 11.25C3.75 11.5484 3.86853 11.8345 4.0795 12.0455C4.29048 12.2565 4.57663 12.375 4.875 12.375ZM10.125 12.375C10.4234 12.375 10.7095 12.2565 10.6655 12.0455C11.1315 11.8345 11.25 11.5484 11.25 11.25C11.25 10.9516 11.1315 10.6655 10.9205 10.4545C10.7095 10.2435 10.4234 10.125 10.125 10.125C9.82663 10.125 9.54048 10.2435 9.3295 10.4545C9.11853 10.6655 9 10.9516 9 11.25C9 11.5484 9.11853 11.8345 9.3295 12.0455C9.54048 12.2565 9.82663 12.375 10.125 12.375Z"
                    fill="currentColor"
                  />
                </svg>

                <span className="md:hidden lg:inline">Add to Cart</span>
              </>
            }
            cls="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700"
          />
        ) : (
          <button
            disabled
            className="flex-1 md:flex-none px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}

        <RemoveProductWishlist
          productId={product._id}
          productTitle={product.title}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}

export function WishlistContent() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    if (!session?.user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    getUserWishlist().then((data) => {
      if (data.status === "success") {
        setWishlist(data.data || []);
      } else {
        setWishlist([]);
      }

      setLoading(false);
    });
  }, [session, wishlistItems]);

  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Please login first
          </h2>

          <Link
            href="/login"
            className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21s-7-4.35-9.33-8.28C.93 9.36 2.17 5.5 5.5 4.5 7.36 3.94 9.4 4.6 12 7.2c2.6-2.6 4.64-3.26 6.5-2.7 3.33 1 4.57 4.86 2.83 8.22C19 16.65 12 21 12 21z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Your Wishlist is Empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to your wishlist.
          </p>

          <Link
            href="/"
            className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>

          <p className="text-gray-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your
            wishlist
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-y border-gray-100 text-sm font-medium text-gray-500">
          <div className="md:col-span-6">Product</div>
          <div className="md:col-span-2 text-center">Price</div>
          <div className="md:col-span-2 text-center">Status</div>
          <div className="md:col-span-2 text-center">Action</div>
        </div>

        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
          {wishlist.map((product) => (
            <WishlistProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}