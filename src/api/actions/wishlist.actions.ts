"use server";


import { revalidatePath } from "next/cache";
import { getTokenFun } from '@/utilities/getTokenData';

export interface WishlistResponseType {
  status: string;
  message?: string;
  count?: number;
  data: any;
}

export async function addProductToWishlist(productId: string) {
  try {
    const token = await getTokenFun();

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({
          productId,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add product to wishlist");
    }

    return data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong",
      data: [],
    };
  }
}

export async function getUserWishlist() {
  try {
    const token = await getTokenFun();

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get user wishlist");
    }

    return data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong",
      count: 0,
      data: [],
    };
  }
}

export async function removeProductFromWishlist(productId: string) {
  try {
    const token = await getTokenFun();

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to remove product");
    }

    revalidatePath("/wishlist");

    return data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Something went wrong",
      data: [],
    };
  }
}