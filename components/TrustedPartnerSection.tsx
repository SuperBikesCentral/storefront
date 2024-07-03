"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';

const TrustedPartnerSection = () => {
  const [filters, setFilters] = useState({
    category: 'All Categories',
    priceRange: 'Any',
    brand: 'All Brands',
  });

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Our Trusted Partners
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <img
            className="col-span-3 max-h-24 w-full object-contain lg:col-span-1"
            src="https://motorlandia.com.ph/wp-content/uploads/2022/10/Suzuki.png"
            alt="Transistor"
        
          />
          <img
            className="col-span-3 max-h-24 w-full object-contain lg:col-span-1"
            src="https://motorlandia.com.ph/wp-content/uploads/2022/10/Honda.png"
            alt="Reform"
          />
          <img
            className="col-span-3 max-h-24 w-full object-contain lg:col-span-1"
            src="https://motorlandia.com.ph/wp-content/uploads/2022/10/Kawasaki.png"
            alt="Tuple"
  
          />
          <img
            className="col-span-3 max-h-24 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="https://motorlandia.com.ph/wp-content/uploads/2022/10/Yamaha.png"
            alt="SavvyCal"
        
          />
    
        </div>
      </div>
    </div>
  )
};

export default TrustedPartnerSection;
