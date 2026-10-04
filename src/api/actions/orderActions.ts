'use server'

import { getTokenFun } from '@/utilities/getTokenData'
import { ShippingAddressDataType } from '@/api/types/orderTypes'

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddressDataType
) {
  try {
    const token = await getTokenFun()

    if (!token) {
      return {
        success: false,
        message: 'You are not logged in',
      }
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          shippingAddress,
        }),
      }
    )

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(
        payload?.message || 'Failed to create cash order'
      )
    }

    return payload
  } catch (error) {
    console.error('Create Cash Order Error:', error)

    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to create cash order'
    )
  }
}

export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddressDataType
) {
  try {
    const token = await getTokenFun()

    if (!token) {
      return {
        success: false,
        message: 'You are not logged in',
      }
    }

    const url = 'http://localhost:3000'

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          shippingAddress,
        }),
      }
    )

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(
        payload?.message || 'Failed to create checkout session'
      )
    }

    return payload
  } catch (error) {
    console.error('Create Checkout Session Error:', error)

    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to create checkout session'
    )
  }
}

export async function getUserOrders() {
  try {
    const token = await getTokenFun()

    if (!token) {
      return []
    }

    const response = await fetch(
      'https://ecommerce.routemisr.com/api/v1/orders',
      {
        method: 'GET',
        headers: {
          token,
        },
        cache: 'no-store',
      }
    )

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(
        payload?.message || 'Failed to get orders'
      )
    }

    return payload.data || []
  } catch (error) {
    console.error('Get User Orders Error:', error)

    return []
  }
}