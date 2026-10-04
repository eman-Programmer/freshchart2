"use client"

import Link from "next/link"
import { Truck, Gift, Phone, Mail, User, UserPlus, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function FirstNav() {

  const { data: sessionData, status } = useSession()

  return (
    <div className="w-full bg-white border-b border-gray-100 text-sm text-gray-600 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <Truck className="size-4 text-green-600" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center gap-2">
            <Gift className="size-4 text-green-600" />
            <span>New Arrivals Daily</span>
          </div>

        </div>


        {/* Right */}
        <div className="flex items-center gap-6">

          <div className="hidden md:flex items-center gap-4">

            <a
              href="tel:+18001234567"
              className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
            >
              <Phone className="size-3.5" />
              <span>+1 (800) 123-4567</span>
            </a>

            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
            >
              <Mail className="size-3.5" />
              <span>support@freshcart.com</span>
            </a>

          </div>

          <div className="hidden md:block h-3.5 w-px bg-gray-200" />

          <div className="flex items-center gap-4 font-medium text-gray-700">

            {status === "authenticated" ? (
              <>

                <div className="flex items-center gap-1.5">
                  <User className="size-3.5" />

                  <span>
                    {sessionData?.user?.name || "asmaa"}
                  </span>
                </div>

                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>

                <Link
                  href="/login"
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  <User className="size-3.5" />
                  <span>Sign In</span>
                </Link>
\
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                >
                  <UserPlus className="size-3.5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}