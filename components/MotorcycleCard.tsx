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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Router pathname:", router.pathname);
  }, [router]);

  const formattedPrice = new Intl.NumberFormat("en-US").format(motorcycle.price);

  const handleViewMore = () => {
    router.push(`/motorcycle/${motorcycle.slug}`);
  };

  return (
    <div className="motorcycle-card group shadow-md p-6">
      <div className="motorcycle-card__content">
        <h2 className="motorcycle-card__content-title">{motorcycle.name}</h2>
      </div>
      <p className="text-red-800">{motorcycle.category_id}</p>

      <p className="flex mt-6 text-[32px] leading-[38px] text-blue-800 font-extrabold">
        &#8369;{formattedPrice}
      </p>

      <div className="relative w-full h-[300px] my-3 overflow-hidden ">
        {motorcycle.image ? (
          <Image
            src={motorcycle.image}
            alt="motorcycle model"
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      <div className="flex flex-col items-start mt-4 mb-16">
        {motorcycle.variations.length > 0 && (
          <>
            <p className="text-sm text-gray-700">
              {motorcycle.variations.length} variations:
            </p>
            <div className="flex space-x-2 mt-2">
              {motorcycle.variations.map((variation, index) => (
                <div
                  key={index}
                  className="relative w-8 h-8 border rounded overflow-hidden"
                >
                  {variation.image ? (
                    <Image
                      src={variation.image}
                      alt={`${motorcycle.name} in ${variation.color}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="relative flex w-full">
        <div className="motorcycle-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-blue-900"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={handleViewMore}
          />
        </div>
      </div>
    </div>
  );
};

export default MotorcycleCard;
