"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { calculateCarRent, generateCarImageUrl, fetchMotorcycles } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  const carRent = calculateCarRent(city_mpg, year);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMotorcycles();
        setMotorcycles(result);
      } catch (error) {
        console.error("Error fetching motorcycles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive ? drive.toUpperCase() : 'N/A'}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>


      {/* Render Motorcycles */}
      <div className="motorcycles-list mt-6">
        <h3 className="text-2xl font-bold mb-4">Similar Motorcycles:</h3>
        {motorcycles.map((motorcycle) => (
          <div key={motorcycle.id} className="motorcycle-card p-4 border rounded-lg mb-4">
            <h4 className="text-xl font-semibold">{motorcycle.name}</h4>
            <p dangerouslySetInnerHTML={{ __html: motorcycle.description }} className="mt-2 text-gray-700"></p>
            <Image src={motorcycle.image} alt={motorcycle.name} width={400} height={300} className="mt-4 rounded" />
            <p className="mt-4 text-lg font-bold">Price: ${motorcycle.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCard;
