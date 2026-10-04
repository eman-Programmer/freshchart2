import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Headphones, 
  Send, 
  HelpCircle
} from 'lucide-react';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full  bg-gray-50/50 pb-12">
      
      <div className="bg-[#31cd69] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
        
          <nav className="text-sm text-green-100 mb-6">
            <span>Home</span> <span className="mx-1">/</span> <span className="font-semibold text-white">Contact Us</span>
          </nav>
          
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Contact Us</h1>
              <p className="text-green-100 text-sm mt-1">
                We'd love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          
          <div className="space-y-4">
            {/* Phone */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-xs text-gray-500 mt-0.5">Mon-Fri from 8am to 6pm</p>
                <p className="text-green-600 font-medium text-sm mt-2">+1 (800) 123-4567</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-xs text-gray-500 mt-0.5">We'll respond within 24 hours</p>
                <p className="text-green-600 font-medium text-sm mt-2">support@freshcart.com</p>
              </div>
            </div>

            {/* Office */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Office</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  123 Commerce Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>

            {/*Hours */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Business Hours</h3>
                <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                  <p>Monday - Friday: 8am - 6pm</p>
                  <p>Saturday: 9am - 4pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Follow Us*/}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Follow Us</h3>
              <div className="flex gap-2">
  <a
    href="#"
    className="p-2.5 bg-gray-100 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full transition-colors"
  >
    <FaFacebookF className="w-4 h-4" />
  </a>

  <a
    href="#"
    className="p-2.5 bg-gray-100 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full transition-colors"
  >
    <FaTwitter className="w-4 h-4" />
  </a>

  <a
    href="#"
    className="p-2.5 bg-gray-100 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full transition-colors"
  >
    <FaInstagram className="w-4 h-4" />
  </a>

  <a
    href="#"
    className="p-2.5 bg-gray-100 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full transition-colors"
  >
    <FaLinkedinIn className="w-4 h-4" />
  </a>
</div>
            </div>
          </div>

         
          <div className="lg:col-span-2 space-y-6">
            {/* Form  */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-green-50 rounded-xl text-green-600">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-xs text-gray-500">Fill out the form and we'll get back to you</p>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Subject</label>
                  <select className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="billing">Billing</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-300 resize-none"
                  ></textarea>
                </div>

                {/*Button */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#16a34a] text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-green-600 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-green-50/50 border border-green-100 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-green-600 text-white rounded-full">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Looking for quick answers?</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
                </p>
                <a href="#" className="inline-block text-xs font-semibold text-green-600 hover:text-green-700 mt-2">
                  Visit Help Center &rarr;
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}