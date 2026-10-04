'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { CartResponseType } from '@/api/types/cartTypes'
import { ShippingAddressDataType } from '@/api/types/orderTypes'
import Loading from '@/app/loading'

import {
  createCashOrder,
  createCheckoutSession,
} from '@/api/actions/orderActions'

import {
  ArrowLeft,
  Building2,
  CreditCard,
  Home,
  Info,
  MapPin,
  Phone,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Truck,
  CheckCircle2,
  RotateCcw,
  Lock,
  Loader2,
} from 'lucide-react'

export default function CheckoutForm() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')

  const [formData, setFormData] = useState<ShippingAddressDataType>({
    details: '',
    phone: '',
    city: '',
  })

  const {
    data: cartData,
    isLoading: cartLoading,
    isError: cartError,
  } = useQuery<CartResponseType>({
    queryKey: ['getCart'],
    queryFn: async () => {
      const response = await fetch('/api/Cart')

      if (!response.ok) {
        throw new Error('Failed to get cart')
      }

      return response.json()
    },
  })


  const cartId = cartData?.data?._id


  const {
    mutate: submitOrder,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: async () => {
      if (!cartId) {
        throw new Error('Cart is empty or not found')
      }

      return await createCashOrder(cartId, formData)
    },

    onSuccess: (result) => {
      console.log('Cash Order Result:', result)

      if (result?.success === false) {
        toast.error(result.message || 'Failed to create order')
        return
      }

      if (result?.status !== 'success') {
        toast.error(result?.message || 'Failed to create order')
        return
      }

      toast.success('Order placed successfully!')

      queryClient.invalidateQueries({
        queryKey: ['getCart'],
      })

      router.push('/allOrders')
    },

    onError: (error: Error) => {
      console.error('Cash Order Error:', error)

      toast.error(
        error.message || 'Something went wrong while creating the order'
      )
    },
  })

  // Online Payment

  const {
    mutate: submitOnlineOrder,
    isPending: isOnlineSubmitting,
  } = useMutation({
    mutationFn: async () => {
      if (!cartId) {
        throw new Error('Cart is empty or not found')
      }

      return await createCheckoutSession(cartId, formData)
    },

    onSuccess: (result) => {
      console.log('Checkout Session Result:', result)

      if (result?.success === false) {
        toast.error(
          result.message || 'Failed to create checkout session'
        )
        return
      }

      if (result?.status && result.status !== 'success') {
        toast.error(
          result.message || 'Failed to create checkout session'
        )
        return
      }

      const checkoutUrl =
        result?.session?.url ||
        result?.data?.session?.url ||
        result?.data?.data?.session?.url

      if (!checkoutUrl) {
        toast.error('Checkout URL was not returned')
        return
      }

      window.location.href = checkoutUrl
    },

    onError: (error: Error) => {
  
      toast.error(
        error.message || 'Something went wrong with online payment'
      )
    },
  })

  // Loading

  if (cartLoading) {
    return <Loading />
  }

  // Error

  if (cartError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-3">
            Failed to load cart
          </h2>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>
      </div>
    )
  }

  const products = cartData?.data?.products || []

  const subtotal = cartData?.data?.totalCartPrice || 0

  const shipping = subtotal > 0 ? 50 : 0

  const total = subtotal + shipping



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!cartId) {
      toast.error('Cart is empty or not found!')
      return
    }

    if (!formData.details.trim()) {
      toast.error('Please enter your address details')
      return
    }

    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number')
      return
    }

    if (!formData.city.trim()) {
      toast.error('Please enter your city')
      return
    }

    if (paymentMethod === 'cash') {
      submitOrder()
    } else {
      submitOnlineOrder()
    }
  }


  const isProcessing = isSubmitting || isOnlineSubmitting


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">


        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Checkout
              </h1>

              <p className="text-gray-500 mt-1">
                Complete your order
              </p>
            </div>
          </div>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-6">

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Shipping Address
                    </h2>

                    <p className="text-sm text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">

                  {/* Details */}

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Home className="w-4 h-4 text-gray-500" />
                      Address Details
                    </label>

                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Enter your full address..."
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none transition"
                    />
                  </div>

                  {/* Phone */}

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>

                  {/* City */}

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                    />
                  </div>

                </div>
              </div>


              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Method
                    </h2>

                    <p className="text-sm text-gray-500">
                      Choose your preferred payment method
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  {/* Cash */}

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`text-left border-2 rounded-2xl p-5 transition ${
                      paymentMethod === 'cash'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Truck className="w-6 h-6 text-green-600" />

                          <h3 className="font-bold text-gray-900">
                            Cash on Delivery
                          </h3>
                        </div>

                        <p className="text-sm text-gray-500">
                          Pay when your order arrives
                        </p>
                      </div>

                      {paymentMethod === 'cash' && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>

                  {/* Card */}

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`text-left border-2 rounded-2xl p-5 transition ${
                      paymentMethod === 'card'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CreditCard className="w-6 h-6 text-green-600" />

                          <h3 className="font-bold text-gray-900">
                            Credit / Debit Card
                          </h3>
                        </div>

                        <p className="text-sm text-gray-500">
                          Secure payment through Stripe
                        </p>
                      </div>

                      {paymentMethod === 'card' && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>

                </div>

                {/* Security */}

                <div className="mt-5 flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                  <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />

                  <div>
                    <p className="font-semibold text-green-800">
                      Secure Payment
                    </p>

                    <p className="text-sm text-green-700 mt-1">
                      Your payment information is securely processed.
                    </p>
                  </div>
                </div>

              </div>


              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-green-600 mt-0.5" />

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Order Information
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Please make sure your address and phone number
                      are correct before placing your order.
                    </p>
                  </div>
                </div>

              </div>

            </div>


            <div className="space-y-6">


              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-6">

                <div className="flex items-center gap-3 mb-6">
                  <Receipt className="w-5 h-5 text-green-600" />

                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>


                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">

                  {products.length > 0 ? (
                    products.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3"
                      >
                        <div className="relative w-16 h-16 bg-gray-50 rounded-xl p-2 shrink-0">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm line-clamp-2">
                            {item.product.title}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            Qty: {item.count}
                          </p>
                        </div>

                        <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                          {(item.price * item.count).toLocaleString()} EGP
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />

                      <p className="text-gray-500">
                        Your cart is empty
                      </p>
                    </div>
                  )}

                </div>


                <div className="border-t border-gray-100 my-5" />


                <div className="space-y-3">

                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>

                    <span className="font-medium">
                      {subtotal.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>

                    <span className="font-medium">
                      {shipping.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-green-600">
                      {total.toLocaleString()} EGP
                    </span>
                  </div>

                </div>


                <button
                  type="submit"
                  disabled={isProcessing || !cartId}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />

                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />

                      Place Order
                    </>
                  )}
                </button>


                <Link
                  href="/cart"
                  className="w-full mt-3 border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <ArrowLeft className="w-4 h-4" />

                  Back to Cart
                </Link>


                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-5">
                  <Lock className="w-3.5 h-3.5" />

                  Secure checkout
                </div>

              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  )
}