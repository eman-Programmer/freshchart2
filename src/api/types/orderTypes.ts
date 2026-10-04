import { Product } from './cartTypes'

export interface ShippingAddressDataType {
  details: string
  phone: string
  city: string
}

export interface OrderUser {
  _id?: string
  id?: string
  name: string
  email: string
  phone?: string
}

export interface Pricing {
  cartPrice: number
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
}

export interface OrderCashType {
  status: string
  message: string
  user: OrderUser
  pricing: Pricing
  data: OrderData
}

export interface OrderData {
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: OrderUser
  cartItems: Product[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
  shippingAddress?: ShippingAddressDataType
}

export interface OrderCardType {
  status: string
  message?: string
  session: Session
}

export interface Session {
  url: string
  success_url: string
  cancel_url: string
}

export type OrdersType = Order[]

export interface Order {
  shippingAddress?: ShippingAddressDataType
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: OrderUser
  cartItems: Product[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
  paidAt?: string
}