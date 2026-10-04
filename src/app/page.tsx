import FeaturedProducts from "./_component/FeaturedProducts/FeaturedProducts";
import Slider from "./_component/slider/slider";
import StoreFeatures from './_component/StoreFeatures/StoreFeatures'
import PromoSection from './_component/PromoSection/PromoSection'
import NewsletterSection from './_component/NewsletterSection/NewsletterSection'
import ShopCate from "./_component/ShopCate/ShopCate";
import img1 from "../assets/images/slider-image-1.jpeg";
import img2 from "../assets/images/slider-image-2.jpeg";
import img3 from "../assets/images/slider-image-3.jpeg";

export default function Home() {
  const sliderData = [
    {
      image: img1,
      title: "Fresh Products Delivered to your Door",
      description: "Get 20% off your first order",
      button1Text: "Shop Now",
      button2Text: "View Deals",
    },
    {
      image: img2,
      title: "Premium Quality Guaranteed",
      description: "Fresh from farm to your table",
      button1Text: "Shop Now",
      button2Text: "Learn More",
    },
    {
      image: img3,
      title: "Fast & Free Delivery",
      description: "Same day delivery available",
      button1Text: "Order Now",
      button2Text: "Delivery Info",
    },
  ];

  return (
    <main>
      <Slider
        spaceBetween={0}
        slidesPerView={1}
        pageList={sliderData}
      />
      <StoreFeatures />
      <ShopCate/>
      <PromoSection/>
      <FeaturedProducts />
      <NewsletterSection/>
    </main>
  );
}