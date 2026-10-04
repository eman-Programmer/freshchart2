    'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllProducts } from '@/api/services/productApi';
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaShareAlt,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
  FaBoxes,
  FaCheckCircle,
  FaRegStar
} from 'react-icons/fa';
import { getSingleProduct } from '@/api/services/productApi';
import AddBtn from '@/app/_component/AddBtn/AddBtn';

export default function ProductDetails(props: any) {

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

useEffect(() => {

  async function getData() {

    try {

      const paramsData = await props.params;

      const res = await getSingleProduct(paramsData.id);

      const data = res;

      setProduct(data);

      if (data.images && data.images.length > 0) {
        setSelectedImage(data.images[0]);
      } else {
        setSelectedImage(data.imageCover);
      }

      // Get all products
      const allProducts = await getAllProducts();

      
      const relatedProducts = allProducts
        .filter((item) => item._id !== data._id)
        .slice(0, 5);

      setProducts(relatedProducts);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  getData();

}, [props.params]);


  if (loading) {
    return (
      <div className="p-12 text-center">
        Loading product...
      </div>
    );
  }


  if (!product) {
    return (
      <div className="p-12 text-center text-red-500">
        Product not found
      </div>
    );
  }


  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.imageCover];


  return (
    
 <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative w-full h-[400px] border rounded-xl">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain p-4"
            />

          </div>


          <div className="flex gap-3 mt-4">

            {allImages.map((image: string, index: number) => (

              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative w-20 h-20 border rounded-lg"
              >

                <Image
                  src={image}
                  alt="Product"
                  fill
                  className="object-cover"
                />

              </button>

            ))}

          </div>

        </div>


        <div>

          <p className="text-emerald-600">
            {product.category?.name}
          </p>


          <h1 className="text-3xl font-bold mt-2">
            {product.title}
          </h1>



          <div className="flex items-center gap-2 mt-3">

            <div className="flex text-yellow-400">

              {[1, 2, 3, 4, 5].map((star) => (

                <FaStar key={star} />

              ))}

            </div>

            <span>
              {product.ratingsAverage || 4}
            </span>

          </div>

          <p className="text-2xl font-bold mt-4">
            {product.price} EGP
          </p>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>


          <div className="mt-6">

            <p className="font-bold mb-2">
              Quantity
            </p>

            <div className="flex items-center gap-3">

              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="border px-4 py-2"
              >
                -
              </button>

              <span>
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="border px-4 py-2"
              >
                +
              </button>

            </div>

          </div>



          <div className="mt-5 bg-gray-100 p-4 rounded-lg">

            <span>
              Total Price:
            </span>

            <span className="font-bold text-emerald-600 ml-2">
              {(product.price * qty).toFixed(2)} EGP
            </span>

          </div>

          <div className="flex gap-3 mt-5">

             <AddBtn prodId={product._id} cls="flex-1 bg-green-600 text-white py-3 rounded-lg" 
             child={
    <>
      <FaShoppingCart className="inline mr-2" /> 
      Add to Cart </> 
    } />


            <button className="flex-1 bg-black text-white py-3 rounded-lg">

              <FaBolt className="inline mr-2" />

              Buy Now

            </button>

          </div>

        </div>

      </div>

<div className="border rounded-xl mt-10">

  <div className="flex border-b">

    <button
      onClick={() => setActiveTab('details')}
      className={`px-6 py-4 flex items-center gap-2 ${
        activeTab === 'details'
          ? 'text-emerald-600 border-b-2 border-emerald-600'
          : 'text-gray-600'
      }`}
    >
      <FaBoxes />
      Product Details
    </button>


    <button
      onClick={() => setActiveTab('reviews')}
      className={`px-6 py-4 flex items-center gap-2 ${
        activeTab === 'reviews'
          ? 'text-emerald-600 border-b-2 border-emerald-600'
          : 'text-gray-600'
      }`}
    >
      <FaStar />
      Reviews ({product.ratingsQuantity || 0})
    </button>


    <button
      onClick={() => setActiveTab('shipping')}
      className={`px-6 py-4 flex items-center gap-2 ${
        activeTab === 'shipping'
          ? 'text-emerald-600 border-b-2 border-emerald-600'
          : 'text-gray-600'
      }`}
    >
      <FaTruck />
      Shipping & Returns
    </button>

  </div>



  <div className="p-6">


    {activeTab === 'details' && (

      <div className="space-y-6">

        <div>

          <h2 className="font-bold text-xl">
            About this Product
          </h2>

          <p className="text-gray-600 mt-3">
            {product.description}
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div className="bg-gray-50 p-4 rounded-xl">

            <h3 className="font-bold text-lg mb-4">
              Product Information
            </h3>


            <div className="space-y-3">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-medium">
                  {product.category?.name || 'Not available'}
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-500">
                  Subcategory
                </span>

                <span className="font-medium">
                  {product.subcategory?.[0]?.name || 'Not available'}
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-500">
                  Brand
                </span>

                <span className="font-medium">
                  {product.brand?.name || 'Not available'}
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-500">
                  Items Sold
                </span>

                <span className="font-medium">
                  {product.sold || 0} sold
                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-500">
                  Available Quantity
                </span>

                <span className="font-medium">
                  {product.quantity || 0}
                </span>

              </div>

            </div>

          </div>


          <div className="bg-gray-50 p-4 rounded-xl">

            <h3 className="font-bold text-lg mb-4">
              Key Features
            </h3>


            <ul className="space-y-3">

              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" />
                Premium Quality Product
              </li>


              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" />
                100% Authentic Guarantee
              </li>


              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" />
                Fast & Secure Packaging
              </li>


              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" />
                Quality Tested
              </li>

            </ul>

          </div>

        </div>

      </div>

    )}


    {/* Reviews */}

    {activeTab === 'reviews' && (

      <div>

        <h2 className="font-bold text-xl mb-5">
          Customer Reviews
        </h2>


        <div className="flex items-center gap-4">

          <div className="text-4xl font-bold">
            {product.ratingsAverage || 0}
          </div>


          <div>

            <div className="flex text-yellow-400">

              {[1, 2, 3, 4, 5].map((star) => (

                <FaStar
                  key={star}
                  className={
                    star <= Math.round(product.ratingsAverage || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }
                />

              ))}

            </div>


            <p className="text-gray-500 text-sm mt-1">
              Based on {product.ratingsQuantity || 0} reviews
            </p>

          </div>

        </div>

      </div>

    )}


    {/* Shipping */}

   {activeTab === 'shipping' && (

  <div className="space-y-6">

   

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


      <div className="bg-emerald-50 p-6 rounded-xl">

        <div className="flex items-center gap-3 mb-5">

          <div className="bg-emerald-600 text-white p-4 rounded-full">
            <FaTruck />
          </div>

          <h3 className="font-bold text-lg">
            Shipping Information
          </h3>

        </div>


        <div className="space-y-3 text-sm">

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            Free shipping on orders over $50
          </p>

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            Standard delivery: 3-5 business days
          </p>

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            Express delivery available (1-2 business days)
          </p>

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            Track your order in real-time
          </p>

        </div>

      </div>


      <div className="bg-emerald-50 p-6 rounded-xl">

        <div className="flex items-center gap-3 mb-5">

          <div className="bg-emerald-600 text-white p-4 rounded-full">
            <FaUndo />
          </div>

          <h3 className="font-bold text-lg">
            Returns & Refunds
          </h3>

        </div>


        <div className="space-y-3 text-sm">

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            30-day hassle-free returns
          </p>

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            Full refund or exchange available
          </p>

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            Free return shipping on defective items
          </p>

          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-600" />
            Easy online return process
          </p>

        </div>

      </div>

    </div>


    

    <div className="bg-gray-50 p-6 rounded-xl">

      <div className="flex items-center gap-4">

        <div className="bg-gray-200 text-gray-600 p-4 rounded-full">
          <FaShieldAlt />
        </div>

        <div>

          <h3 className="font-bold text-lg">
            Buyer Protection Guarantee
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Get a full refund if your order doesn't arrive
            or isn't as described. We ensure your shopping
            experience is safe and secure.
          </p>

        </div>

      </div>

    </div>

  </div>

)}

  </div>

</div>


      <div className="my-12">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-emerald-600 pl-3">
      You May Also <span className="text-emerald-600">Like</span>
    </h2>

    <div className="flex gap-2">

      <button className="p-2 border rounded-full hover:bg-gray-100">
        <FaChevronLeft className="text-xs" />
      </button>

      <button className="p-2 border rounded-full hover:bg-gray-100">
        <FaChevronRight className="text-xs" />
      </button>

    </div>

  </div>


  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

    {products.map((item) => (

      <div
        key={item._id}
        className="border rounded-xl p-3 bg-white hover:shadow-md relative"
      >


        <div className="relative w-full h-36 mb-3 bg-gray-50 rounded-lg overflow-hidden">

          <Image
            src={item.imageCover}
            alt={item.title}
            fill
            className="object-contain p-2"
          />

        </div>



        <p className="text-[10px] text-gray-400 uppercase font-semibold">
          {item.category?.name}
        </p>


        <h3 className="text-xs font-bold text-gray-800 truncate">
          {item.title}
        </h3>


        <div className="flex items-center gap-1 text-[11px] text-amber-400 my-1">

          <FaStar />

          <span className="text-gray-600 font-semibold">
            {item.ratingsAverage || 0}
          </span>

        </div>


        <div className="flex justify-between items-center mt-2">

          <div className="text-sm font-extrabold text-gray-900">
            {item.price} EGP
          </div>


          <button className="p-2 bg-emerald-600 text-white rounded-full">

            <FaShoppingCart className="text-xs" />

          </button>

        </div>

      </div>

    ))}

  </div>

</div>

      </div>

    
  );
}