// MotorcycleCard.tsx

"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { Motorcycle } from "@types";

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
}

const MotorcycleCard = ({ motorcycle }: MotorcycleCardProps) => {
  const router = useRouter(); // Move useRouter() inside the component
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Router pathname:", router.pathname);
  }, [router]);

  // Format price with commas
  const formattedPrice = new Intl.NumberFormat("en-US").format(
    motorcycle.price
  );

  // Handle clicking "View More" button
  const handleViewMore = () => {
    router.push(`/motorcycle/${motorcycle.slug}`); // Navigate to product info page with motorcycle ID
  };

  return (
    <div className="motorcycle-card group shadow-md p-6">
      <div className="motorcycle-card__content">
        <h2 className="motorcycle-card__content-title">{motorcycle.name}</h2>
      </div>
      <p className='text-red-800'>{motorcycle.category_id}</p>

      <p className="flex mt-6 text-[32px] leading-[38px] text-blue-800 font-extrabold">
        &#8369;{formattedPrice}
      </p>

      <div className="relative w-full h-[300px] my-3 object-contain overflow-hidden mb-12">
        <Image
          src={motorcycle.image}
          alt="motorcycle model"
          layout="fill"
          objectFit="contain"
          className="object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="motorcycle-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-blue-900"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={handleViewMore} // Navigate to product info page on click
          />
        </div>
      </div>

      {/* <MotorcycleDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} motorcycle={motorcycle} /> */}
    </div>
  );
};

export default MotorcycleCard;
