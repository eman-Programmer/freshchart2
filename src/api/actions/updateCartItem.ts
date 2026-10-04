'use server'

import { getTokenFun } from "@/utilities/getTokenData"
import { count } from "console"

export async function updateCart({prodId , count}:{prodId: string , count : number}) {
  const token = await getTokenFun()

  if (!token) {
    throw new Error("Unauthorized")
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${prodId}`,
      {
        method: "PUT",

        body: JSON.stringify({
          count: count,
        }),

        headers: {
          token: token,
          "Content-Type" : "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to add product to cart")
    }

    const payload = await response.json()


    return payload
  } 
  catch (error) {
    throw new Error("Failed to add product to cart")
  }
}