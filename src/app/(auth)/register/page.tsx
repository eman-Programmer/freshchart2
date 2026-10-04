"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa6";
import { FaTruckFast, FaShieldHalved } from "react-icons/fa6";
import reviewAuthor from "@/assets/images/review-author.png";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/api/actions/auth.actions";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

const onSubmit = async (data: any) => {
  setLoading(true);

  const result = await registerUser(data);

  if (result.success && result.message === "success") {
    router.push("/login");
  } else {
    setApiError(result.message);
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 ">
      <div className=" w-full bg-white  p-4 grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        
        {/* Left*/}
        <div className="mt-4">
          <div>
            <h1 className="text-5xl mb-3 font-bold text-gray-700">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-gray-700 mb-8 text-xl">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
            </p>
          </div>

          <div className="space-y-6 my-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl flex-shrink-0">
                ★
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Premium Quality</h3>
                <p className="text-sm text-gray-500">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl flex-shrink-0">
                <FaTruckFast className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
                <p className="text-sm text-gray-500">
                  Same-day delivery available in most areas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl flex-shrink-0">
                <FaShieldHalved className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Secure Shopping</h3>
                <p className="text-sm text-gray-500">
                  Your data and payments are completely secure
                </p>
              </div>
            </div>
          </div>

          {/*  Card */}
          <div className=" mt-4 p-4 rounded-xl border border-gray-100 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-bold text-white">
<img src={reviewAuthor.src} alt="Sarah Johnson" className="w-10 h-10 rounded-full" />              </div>
              <div>
                <h4 className="font-medium text-md">Sarah Johnson</h4>
                <div className="text-amber-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-md text-gray-600 italic">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
            <p className="text-md text-gray-800 mt-1">
              Start your fresh journey with us today
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button type="button" className="flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition">
              <span className="text-red-500 font-bold text-xl">G</span> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition">
              <span className="text-blue-600 font-bold text-xl">f</span> Facebook
            </button>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-4 text-xs text-gray-800 uppercase">
              or
            </span>
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {apiError}
            </div>
          )}

          {/* Form*/}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
          <Controller
  name="name"
  control={form.control}
  rules={{
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
  }}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
      <Input
        {...field}
        id={field.name}
        placeholder="Ali"
        aria-invalid={fieldState.invalid}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

            {/* Email */}
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
                  <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id={field.name}
                    placeholder="ali@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
  name="password"
  control={form.control}
  rules={{
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: "Must contain uppercase, lowercase, number, and special character",
    },
  }}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
      <Input
        {...field}
        type="password"
        id={field.name}
        placeholder="create a strong password"
        aria-invalid={fieldState.invalid}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

            {/* Confirm Password */}
            <Controller
              name="rePassword"
              control={form.control}
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === form.getValues("password") ||
                  "Passwords do not match",
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password*</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    placeholder="confirm your password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^01[0125][0-9]{8}$/,
                  message: "Must be a valid Egyptian phone number",
                },
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                  <Input
                    {...field}
                    type="tel"
                    id={field.name}
                    placeholder="01010700701"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Terms and conditions */}
          <Controller
  name="terms"
  control={form.control}
  rules={{
    required: "You must accept the terms and conditions",
  }}
  render={({ field, fieldState }) => (
    <div>
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="terms"
          checked={field.value || false}
          onChange={(e) => field.onChange(e.target.checked)}
          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-800">
          I agree to the{" "}
          <a href="#" className="text-green-600 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-green-600 underline">
            Privacy Policy
          </a>{" "}
          *
        </label>
      </div>
      {fieldState.invalid && (
        <p className="text-xs text-red-500 mt-1">
          {fieldState.error?.message}
        </p>
      )}
    </div>
  )}
/>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <span>
                  <FaUserPlus />
</span> Create My Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}