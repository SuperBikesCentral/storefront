"use client"
import { CustomButton } from '@components';
import { useState } from 'react';
import Link from "next/link";

const CardTwoColumnCta = () => {
  const [slides, setSlides] = useState([
    {
      image: "https://motorlandia.com.ph/wp-content/uploads/2022/10/Wide-range2-2.png",
      title: "High Performance Motorcycles",
      description: "Experience the thrill of riding with our top-of-the-line motorcycles.",
      buttonText: "Shop Now",
    }
  ]);

  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
      <div className="relative w-full h-64 md:h-auto">
        <img
          className="dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
          alt="dashboard image"
        />
        <img
          className="hidden dark:block"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
          alt="dashboard image"
        />
      </div>
      <div className="mt-4 md:mt-0">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-bluue-900 dark:text-white">
          Let's create more tools and ideas that bring us together.
        </h2>
        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
          Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.
        </p>
        <CustomButton
              title='View More'
              containerStyles='w-full py-[16px] rounded-full bg-red-600'
              textStyles='text-white text-[14px] leading-[17px] font-bold'
              rightIcon='/right-arrow.svg'
              // handleClick={() => setIsOpen(true)}
            />
      </div>
    </div>
  </section>
  );
};

export default CardTwoColumnCta;
