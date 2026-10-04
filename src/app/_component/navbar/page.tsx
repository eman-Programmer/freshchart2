"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Headphones,
  Menu,
  X,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import logo from "../../../assets/images/freshcart-logo.svg";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleLogOut() {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between gap-4 px-4">

        <Link href="/">
          <Image
            src={logo}
            alt="FreshCart Logo"
            width={160}
            height={40}
            priority
            className="w-auto h-auto"
          />
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-2 relative">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full pr-12 pl-4 py-5 text-sm rounded-full border border-gray-200 focus-visible:ring-1 focus-visible:ring-green-500 placeholder:text-gray-400"
            />

            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-full size-8"
            >
              <Search className="size-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-2 text-sm font-medium text-gray-700">

            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="px-3 py-2 hover:text-green-600 transition-colors"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Shop */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/shop"
                className="px-3 py-2 hover:text-green-600 transition-colors"
              >
                Shop
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Categories */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-700">
                Categories
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="flex flex-col w-52 p-1 bg-white rounded-2xl">

                  {/* Categories */}
                  <li className="hover:bg-green-50 rounded-xl">
                    <Link
                      href="/categories"
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-green-600 rounded-xl transition-colors"
                    >
                      All Categories
                    </Link>
                  </li>

                  {/* Electronics */}
                  <li className="hover:bg-green-50 rounded-xl">
                    <Link
                      href="/categories/electronics"
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-green-600 rounded-xl transition-colors"
                    >
                      Electronics
                    </Link>
                  </li>

                  {/* Women's Fashion */}
                  <li className="hover:bg-green-50 rounded-xl">
                    <Link
                      href="/categories/women's-fashion"
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-green-600 rounded-xl transition-colors"
                    >
                      Women's Fashion
                    </Link>
                  </li>

                  {/* Men's Fashion */}
                  <li className="hover:bg-green-50 rounded-xl">
                    <Link
                      href="/categories/men's-fashion"
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-green-600 rounded-xl transition-colors"
                    >
                      Men's Fashion
                    </Link>
                  </li>

                  {/* Beauty & Health */}
                  <li className="hover:bg-green-50 rounded-xl">
                    <Link
                      href="/categories/beauty-and-health"
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-green-600 rounded-xl transition-colors"
                    >
                      Beauty & Health
                    </Link>
                  </li>

                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Brands */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/brands"
                className="px-3 py-2 hover:text-green-600 transition-colors"
              >
                Brands
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Support */}
          <div className="hidden xl:flex items-center gap-2.5 border-r pr-4 border-gray-200">
            <div className="p-2 bg-green-50 text-green-600 rounded-full">
              <Headphones className="size-5" />
            </div>

            <Link
              href="/contact"
              className="flex flex-col text-xs leading-tight hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="text-gray-400 font-normal">
                Support
              </span>

              <span className="font-bold text-gray-900">
                24/7 Help
              </span>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </Button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Heart className="size-5" />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ShoppingCart className="size-5" />
          </Link>

          {/* Authentication */}
          {status === "authenticated" ? (
            <Button
              onClick={handleLogOut}
              className="rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-5 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              Log Out
            </Button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-3 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <User className="size-4" />
              Sign In
            </Link>
          )}

        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-sm">
          <nav className="flex flex-col gap-1">

            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600"
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600"
            >
              Shop
            </Link>

            <Link
              href="/categories"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600"
            >
              Categories
            </Link>

            <Link
              href="/brands"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600"
            >
              Brands
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}