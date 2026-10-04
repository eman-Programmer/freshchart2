import Link from "next/link";
import Image from "next/image"
import logo from "../../../assets/images/freshcart-logo.svg"
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      desc: "14-day return policy",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Contact us anytime",
    },
  ];

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "Categories", href: "/categories" },
        { name: "Brands", href: "/brands" },
        { name: "Electronics", href: "/categories/electronics" },
        { name: "Men's Fashion", href: "/categories/mens-fashion" },
        { name: "Women's Fashion", href: "/categories/womens-fashion" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "My Account", href: "/account" },
        { name: "Order History", href: "/account/orders" },
        { name: "Wishlist", href: "/wishlist" },
        { name: "Shopping Cart", href: "/cart" },
        { name: "Sign In", href: "/login" },
        { name: "Create Account", href: "/register" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Help Center", href: "/help" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns & Refunds", href: "/returns" },
        { name: "Track Order", href: "/track-order" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ];

  return (
    <footer className="w-full mt-10">
    
      <div className="bg-[#eefbf1] py-6 px-4 md:px-12 border-b border-green-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 rounded-lg bg-[#c8f5d5] flex items-center justify-center text-green-700 shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#0f172a] text-slate-300 py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          
          <div className="lg:col-span-4 space-y-5">
            
            <div className="bg-white inline-block px-4 py-2 rounded-lg">
              <Link href="/" >
          <Image src={logo} alt="FreshCart Logo" width={160} height={40} priority />
        </Link>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaFacebookF, href: "https://facebook.com" },
                { icon: FaTwitter, href: "https://twitter.com" },
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaYoutube, href: "https://youtube.com" },
              ].map((social, idx) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-green-600 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
            {footerSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-white font-semibold text-base">{section.title}</h3>
                <ul className="space-y-2.5 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}