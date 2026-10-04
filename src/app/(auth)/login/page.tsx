"use client"
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import loginImage from "@/assets/images/login.png";
import Image from "next/image";

import {
  FaTruck,
  FaShieldHalved,
  FaClock,
  FaLock,
  FaUsers,
  FaStar,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
} from "react-icons/fa6";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signIn } from "next-auth/react";
import { toast, Toaster } from "sonner";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setApiError("");

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.ok) {
      toast.success("Login Successful", {
        description: "You have been logged in successfully.",
      });

      router.push("/");
    } else {
      toast.error("Login Failed", {
        description: "The email or password you entered is incorrect.",
      });

      setApiError("Email or password is incorrect");
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen flex justify-center py-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative w-full max-w-180 h-100 sm:h-80 bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={loginImage}
                alt="FreshCart Grocery"
                className="object-contain max-h-full"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h1>

              <p className="text-gray-500 text-md max-w-md mx-auto">
                Join thousands of happy customers who trust FreshCart for
                their daily grocery needs
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <FaTruck className="text-green-600" />
                <span>Free Delivery</span>
              </div>

              <div className="flex items-center gap-2">
                <FaShieldHalved className="text-green-600" />
                <span>Secure Payment</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-green-600 mb-1">
                Fresh<span className="text-black">Cart</span>
              </h1>

              <h2 className="text-2xl font-bold text-gray-700">
                Welcome Back!
              </h2>

              <p className="text-md text-gray-700 mt-1">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition"
              >
                <span className="text-red-500 font-bold text-xl">G</span>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition"
              >
                <span className="text-blue-600 font-bold text-xl">f</span>
                Continue with Facebook
              </button>
            </div>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>

              <span className="relative bg-white px-3 text-xs text-gray-700 uppercase tracking-wider">
                OR CONTINUE WITH EMAIL
              </span>
            </div>

            {apiError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {apiError}
              </div>
            )}

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <Controller
                name="email"
                control={form.control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-semibold text-gray-700"
                    >
                      Email Address
                    </FieldLabel>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaEnvelope />
                      </span>

                      <Input
                        {...field}
                        type="email"
                        id={field.name}
                        placeholder="Enter your email"
                        className="pl-9"
                        aria-invalid={fieldState.invalid}
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                rules={{
                  required: "Password is required",
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center mb-1">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-semibold text-gray-700"
                      >
                        Password
                      </FieldLabel>

                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-emerald-600 hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaLock />
                      </span>

                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id={field.name}
                        placeholder="Enter your password"
                        className="pl-9 pr-10"
                        aria-invalid={fieldState.invalid}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="rememberMe"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <label
                      htmlFor="rememberMe"
                      className="text-xs text-gray-600"
                    >
                      Keep me signed in
                    </label>
                  </div>
                )}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-md text-gray-700 mt-6 border-t border-gray-100 pt-4">
              New to FreshCart?{" "}
              <Link
                href="/register"
                className="text-green-600 text-md font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>

            <div className="mt-8 pt-4 flex items-center justify-center gap-4 text-[13px] text-gray-500 font-medium">
              <div className="flex items-center gap-1">
                <FaLock className="text-gray-400" />
                <span>SSL Secured</span>
              </div>

              <div className="flex items-center gap-1">
                <FaUsers className="text-gray-400" />
                <span>50K+ Users</span>
              </div>

              <div className="flex items-center gap-1">
                <FaStar />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

