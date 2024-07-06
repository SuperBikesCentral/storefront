"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { CustomButton } from "@components";
import HeroSlide from "./HeroSlide";
import * as React from 'react';

const Hero = () => {
  const [filters, setFilters] = useState({
    category: 'All Categories',
    priceRange: 'Any',
    brand: 'All Brands',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterSubmit = () => {
    // Placeholder for handling filter submission
    console.log(filters);
    // Add logic to apply filters and update product list
  };

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 ">
      <div className="lg:col-span-2">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          className="w-full h-100 lg:h-full"
        >
          <HeroSlide/>
          <HeroSlide/>
          <HeroSlide/>
        </Carousel>
      </div>
      <div className="lg:col-span-1 flex flex-col justify-center bg-blue-900 p-8 rounded-3xl text-white">
        <h2 className="text-2xl font-bold mb-4">Filter Products</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Categories</option>
              <option>Accessories</option>
              <option>Parts</option>
              <option>Helmets</option>
              <option>Apparel</option>
            </select>
          </div>
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium">
              Price Range
            </label>
            <select
              id="priceRange"
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Any</option>
              <option>$0 - $50</option>
              <option>$50 - $100</option>
              <option>$100 - $200</option>
              <option>$200+</option>
            </select>
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium">
              Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Brands</option>
              <option>Brand A</option>
              <option>Brand B</option>
              <option>Brand C</option>
            </select>
          </div>
          <CustomButton
            title='Apply Filters'
            containerStyles='w-full py-[16px] rounded-full bg-red-600'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={handleFilterSubmit} // Assuming you want to submit filters on button click
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
