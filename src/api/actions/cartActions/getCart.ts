
import { getTokenFun } from "@/utilities/getTokenData"

export async function getCart() {
  const token = await getTokenFun()

  if (!token) {
    throw new Error("Unauthorized")
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v2/cart",
      {
        method: "GET",


        headers: {
          token: token,
          "Content-Type" : "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch cart")
    }

    const payload = await response.json()

    console.log(payload)

    return payload
  } 
  catch (error) {
    console.error(error)
    throw new Error("Failed to add product to cart")
  }
}