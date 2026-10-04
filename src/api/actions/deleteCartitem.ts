'use server'

import { getTokenFun } from "@/utilities/getTokenData"

export async function deleteCartItem(prodId: string) {
  const token = await getTokenFun()

  if (!token) {
    throw new Error("Unauthorized")
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${prodId}`,
      {
        method: "DELETE",

        headers: {
          token: token,
          "Content-Type" : "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to delete cart item")
    }

    const payload = await response.json()

    return payload
  } 
  catch (error) {
    
    throw new Error("Failed to delete cart item")
  }
}