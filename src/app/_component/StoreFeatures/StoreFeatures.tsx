"use client";

import React from "react";
import { FaHeadset, FaTruck, FaArrowRotateLeft, FaShieldHalved } from "react-icons/fa6";

export interface FeatureItem {
  h3: string;
  p: string;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
}

export const featuresArr: FeatureItem[] = [
  {
    h3: "Free Shipping",
    p: "On orders over 500 EGP",
    icon: FaTruck,
    bgColor: "bg-blue-50",
    textColor: "text-blue-500",
  },
  {
    h3: "Secure Payment",
    p: "100% secure transactions",
    icon: FaShieldHalved,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-500",
  },
  {
    h3: "Easy Returns",
    p: "14-day return policy",
    icon: FaArrowRotateLeft,
    bgColor: "bg-orange-50",
    textColor: "text-orange-500",
  },
  {
    h3: "24/7 Support",
    p: "Dedicated support team",
    icon: FaHeadset,
    bgColor: "bg-purple-50",
    textColor: "text-purple-500",
  },
];

function FeatureCard({ feature }: { feature: FeatureItem }) {
  const Icon = feature.icon;
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div
        className={`${feature.bgColor} ${feature.textColor} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
      >
        <Icon className="text-xl" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">{feature.h3}</h3>
        <p className="text-xs text-gray-500 font-medium">{feature.p}</p>
      </div>
    </div>
  );
}

export default function StoreFeatures() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuresArr.map((feature) => (
            <FeatureCard key={feature.h3} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}