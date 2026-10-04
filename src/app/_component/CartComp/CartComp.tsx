'use client'

import { CartResponseType } from '@/api/types/cartTypes'
import Loading from '@/app/loading'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  User,
} from 'lucide-react'
import { deleteCartItem } from '@/api/actions/deleteCartitem'
import { toast } from 'sonner'
import { updateCart } from '@/api/actions/updateCartItem'
import { clearCart } from '@/api/actions/cartActions/clearCart.action'
import { useSession } from 'next-auth/react'

export default function CartComp() {

  const query = useQueryClient()

  // login 
  const { status } = useSession()

  const isLoggedIn = status === 'authenticated'

  //get cart

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery<CartResponseType>({
    queryKey: ['getCart'],

    queryFn: async () => {
      const response = await fetch('/api/Cart')

      if (!response.ok) {
        throw new Error('Failed to fetch')
      }

      return response.json()
    },
  })

  // delete

  const { mutate: delCartItem } = useMutation({

    mutationFn: deleteCartItem,

    onSuccess: (data) => {

      toast.success(data.message)

      query.invalidateQueries({
        queryKey: ['getCart'],
      })

    },

    onError: () => {
      toast.error('Login first')
    },

  })


  // update
  const { mutate: updateCartItem } = useMutation({

    mutationFn: updateCart,

    onSuccess: (data) => {

      toast.success(data.message)

      query.invalidateQueries({
        queryKey: ['getCart'],
      })

    },

    onError: () => {
      toast.error('Login first')
    },

  })

  // clear
  const { mutate: clearCartItems } = useMutation({

    mutationFn: clearCart,

    onSuccess: (data) => {

      toast.success(data.message)

      query.invalidateQueries({
        queryKey: ['getCart'],
      })

    },

    onError: () => {
      toast.error('Login first')
    },

  })

  //update func

  function HandleUpdateCart(
    prodId: string,
    count: number
  ) {

    if (count < 1) return

    updateCartItem({
      prodId,
      count,
    })

  }


// clear func
  function HandleClearCart() {

    clearCartItems()

  }


  if (isLoading) {
    return <Loading />
  }

  if (isError) {

    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">

        An error occurred while loading your cart.
        Please try again later.

      </div>
    )

  }


  const products = cartData?.data?.products || []

  const totalCartPrice =
    cartData?.data?.totalCartPrice || 0

  const numOfCartItems =
    cartData?.numOfCartItems || 0



  const shipping = isLoggedIn ? 50 : 0

  const finalTotal =
    Number(totalCartPrice) + shipping


  return (

    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">

      <div className="max-w-7xl mx-auto">

        <div className="mb-6">

          <p className="text-sm text-gray-500 mb-4">

            Home /

            <span className="text-gray-800 font-medium">
              {' '}Shopping Cart
            </span>

          </p>


          <div className="flex items-center gap-3 mb-1">

            <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center text-white">

              <ShoppingCart className="w-6 h-6" />

            </div>


            <h1 className="text-2xl font-bold text-slate-900">

              Shopping Cart

            </h1>

          </div>


          <p className="text-sm text-gray-500">

            You have

            <span className="text-green-700 font-semibold">

              {' '}{numOfCartItems} items

            </span>

            {' '}in your cart

          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">


          <div className="lg:col-span-2 space-y-4">


            {products.length === 0 ? (

              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">

                <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-3" />

                <p className="text-gray-500">

                  Your cart is currently empty.

                </p>

                <Link
                  href="/"
                  className="inline-block mt-4 text-green-700 font-medium hover:underline"
                >

                  Continue Shopping

                </Link>

              </div>

            ) : (

              products.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 relative"
                >

                  <div
                    className={`w-28 h-28 bg-gray-50 rounded-xl relative flex-shrink-0 border border-gray-100 ${
                      isLoggedIn
                        ? 'overflow-visible'
                        : 'overflow-hidden'
                    }`}
                  >

                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={112}
                      height={112}
                      className="object-contain p-2 w-full h-full"
                    />


                    {isLoggedIn && (

                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">

                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">

                          ✓ In Stock

                        </span>

                      </div>

                    )}

                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between">


                    <div>

                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">

                        {item.product.title}

                      </h3>

                      <div className="flex items-center gap-2 mt-1 flex-wrap">


                        <span className="inline-block bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">

                          {item.product.category?.name}

                        </span>


                        {isLoggedIn && (

                          <>

                            <span className="text-gray-300">
                              •
                            </span>


                            <span className="text-xs text-gray-500">

                              SKU:
                              {' '}
                              {item.product._id
                                .slice(-6)
                                .toUpperCase()}

                            </span>

                          </>

                        )}

                      </div>


                      <p className="text-green-700 font-bold text-base mt-2">

                        {item.price} EGP


                        {isLoggedIn && (

                          <span className="text-xs font-normal text-gray-400 ml-2">

                            per unit

                          </span>

                        )}

                      </p>

                    </div>


                    <div className="flex items-center gap-2 mt-4">

                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50 px-2 py-1">

                        <button
                          onClick={() =>
                            HandleUpdateCart(
                              item.product._id,
                              item.count - 1
                            )
                          }
                          disabled={item.count <= 1}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        >

                          <Minus className="w-3.5 h-3.5" />

                        </button>

                        <span className="w-8 text-center text-sm font-semibold">

                          {item.count}

                        </span>

                        <button
                          onClick={() =>
                            HandleUpdateCart(
                              item.product._id,
                              item.count + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                        >

                          <Plus className="w-3.5 h-3.5" />

                        </button>

                      </div>

                    </div>

                  </div>

                  <div className="flex sm:flex-col justify-between items-end w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">

                    <button
                      className="p-2 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                      onClick={() =>
                        delCartItem(item.product._id)
                      }
                    >

                      <Trash2 className="w-4 h-4" />

                    </button>


                    <div className="text-right sm:mt-6">

                      <span className="text-xs text-gray-400 block">

                        Total

                      </span>


                      <span className="text-lg font-bold text-slate-900">

                        {item.price * item.count}

                        <span className="text-xs font-normal text-gray-500 ml-1">

                          EGP

                        </span>

                      </span>

                    </div>

                  </div>

                </div>

              ))

            )}


            <div className="flex justify-between items-center pt-4">

              <Link
                href="/"
                className="flex items-center gap-2 text-green-700 text-sm font-medium hover:underline"
              >

                <ArrowLeft className="w-4 h-4" />

                Continue Shopping

              </Link>


              {products.length > 0 && (

                <button
                  className="flex items-center gap-1.5 text-gray-400 hover:text-rose-500 text-sm font-medium transition-colors"
                  onClick={HandleClearCart}
                >

                  <Trash2 className="w-4 h-4" />

                  Clear all items

                </button>

              )}

            </div>

          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">


            {isLoggedIn ? (

              <>

                <div className="bg-green-700 text-white p-5">

                  <div className="flex items-center gap-3">

                    <ShoppingCart className="w-5 h-5" />

                    <div>

                      <h2 className="font-bold text-lg">

                        Order Summary

                      </h2>

                      <p className="text-sm text-green-100">

                        {numOfCartItems} items in your cart

                      </p>

                    </div>

                  </div>

                </div>



                <div className="p-5 space-y-5">


                  <div className="bg-orange-50 rounded-xl p-4">

                    <p className="text-sm font-medium text-gray-700 mb-3">

                      🚚 Add 202 EGP for free shipping

                    </p>


                    <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: '60%' }}
                      />

                    </div>

                  </div>

                  <div className="flex justify-between text-base">

                    <span className="text-gray-600">

                      Subtotal

                    </span>

                    <span className="font-medium text-gray-900">

                      {totalCartPrice} EGP

                    </span>

                  </div>             

                  <div className="flex justify-between text-base">

                    <span className="text-gray-600">

                      Shipping

                    </span>

                    <span className="font-medium text-gray-900">

                      50 EGP

                    </span>

                  </div>



                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center">

                    <span className="font-bold text-lg text-gray-900">

                      Total

                    </span>

                    <span className="text-2xl font-bold text-gray-900">

                      {finalTotal} EGP

                    </span>

                  </div>

                  <button className="w-full border border-dashed border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50">

                    🏷️

                    Apply Promo Code

                  </button>


                  <Link
                    href="/checkout"
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >

                    🔒

                    Secure Checkout

                  </Link>


                  <div className="flex justify-center gap-5 text-xs text-gray-500">

                    <span>
                      🛡 Secure Payment
                    </span>

                    <span>
                      🚚 Fast Delivery
                    </span>

                  </div>

                </div>

              </>

            ) : (

              <>

                {/* DARK HEADER */}

                <div className="bg-slate-900 text-white p-4">

                  <h2 className="font-bold text-lg">

                    Order Summary

                  </h2>

                </div>



                <div className="p-5 space-y-4">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">

                      Subtotal ({numOfCartItems} items)

                    </span>

                    <span className="font-semibold text-slate-900">

                      {totalCartPrice} EGP

                    </span>

                  </div>


                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">

                      Shipping

                    </span>

                    <span className="text-green-700 font-medium">

                      Calculated at checkout

                    </span>

                  </div>



                  <hr className="border-gray-100 my-2" />

                  <div className="flex justify-between items-center my-4">

                    <span className="font-bold text-slate-900">

                      Estimated Total

                    </span>

                    <span className="text-xl font-bold text-green-700">

                      {totalCartPrice} EGP

                    </span>

                  </div>

                  <Link
                    href="/login"
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4"
                  >

                    <User className="w-4 h-4" />

                    Login to Checkout

                  </Link>


                  <p className="text-center text-xs text-gray-400 mt-2">

                    Don't have an account?{' '}

                    <Link
                      href="/register"
                      className="text-green-700 font-medium hover:underline"
                    >

                      Sign up

                    </Link>

                  </p>

                  <div className="pt-4 border-t border-gray-50 space-y-2 text-xs text-gray-500">


                    <div className="flex items-center gap-2">

                      <Check className="w-3.5 h-3.5 text-green-700" />

                      <span>
                        Your cart items will be saved
                      </span>

                    </div>


                    <div className="flex items-center gap-2">

                      <Check className="w-3.5 h-3.5 text-green-700" />

                      <span>
                        Track your orders easily
                      </span>

                    </div>

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  )
}