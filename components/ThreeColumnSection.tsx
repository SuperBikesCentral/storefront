"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { CustomButton } from "@components";

const ThreeColumnSection = () => {
  const [filters, setFilters] = useState({
    category: 'All Categories',
    priceRange: 'Any',
    brand: 'All Brands',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterSubmit = () => {
    // Handle filter submission
    console.log(filters);
  };

  return (
    <div className="bg-primary-blue-100 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">
              Ang Motorcycle Shop ng Bayan. At your doorstep!
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Door to door Deliviery
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">
              Apply motorcycle loan via Superbikes App
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Online Application
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">
              Pay via Maya App and GCash (thru Dragon Loans)
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Pay Dues Online
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ThreeColumnSection;
