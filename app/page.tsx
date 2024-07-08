"use client"
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchMotorcycles } from '@utils';
import { CardTwoColumnCta, CustomButton, Hero, MotorcycleCard } from '@components';
import { fuels, yearsOfProduction } from '@constants';
import { Motorcycle } from '@types';
import ThreeColumnSection from '@components/ThreeColumnSection';
import DownloadSection from '@components/DownloadSection';
import TrustedPartnerSection from '@components/TrustedPartnerSection';

export default function Home() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    manufacturer: '',
    year: 0,
    model: '',
    per_page: 6,
    fuel: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchMotorcycles(filters);

        console.log(result)
        setMotorcycles(result.data);
      } catch (error) {
        console.error("Error fetching motorcycles:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [filters]);
  const isDataEmpty = !Array.isArray(motorcycles) || motorcycles.length === 0;

  const handleFilterChange = (filterName: string, value: string | number) => {
    // Convert year to number if needed
    if (filterName === 'year') {
      value = parseInt(value as string, 10); // Parse value as integer
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  const content1 = {
    title: 'Title 1',
    description: 'Description 1',
    buttonText: 'Button 1',
    carouselImages: [
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
    ],
  };

  const content2 = {
    title: 'Title 2',
    description: 'Description 2',
    buttonText: 'Button 2',
    carouselImages: [
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
    ],
  };

  return (
    <main className="overflow-hidden">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Your existing Hero section */}
      <Hero />
      <ThreeColumnSection />

      <div className="m-6 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-5xl font-extrabold">Featured</h1>
          <p>Explore motorcycles you might like</p>
        </div>

        {/* Optional: Add search bar and filters */}

        {isLoading ? (
          <p>Loading...</p>
        ) : isDataEmpty ? (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{/* Display an appropriate error message */}</p>
          </div>
        ) : (
          <section>
            <div className="home__motorcycles-wrapper">
              {motorcycles.map((motorcycle) => (
                <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
              ))}
            </div>
          </section>
        )}
      </div>

      <DownloadSection />
     <TrustedPartnerSection/>

      <div className="relative overflow-hidden bg-primary-blue-100">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Customer Showcase
              </h1>
              <p className="mt-4 text-xl text-gray-500">
              Celebrating Our Latest Deliveries and the Riders Who Love Them
              </p>
              <CustomButton
                    title="Read more"
                    containerStyles="w-1/2 my-6 py-[16px] rounded-full bg-red-600"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="/right-arrow.svg"
                    // handleClick={() => setIsOpen(true)}
                  />
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/448562081_1028487675946572_9159230721191080216_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGJFHD2m6ydD7ADQb1zyz3LDsIq0CFFRGoOwirQIUVEaj7vlhOEvys50LcC9VI9AbPRAr-yWIoa9qwTruYoRuZW&_nc_ohc=KYzXnI7w75MQ7kNvgG5bhLM&_nc_ht=scontent.fmnl9-2.fna&oh=00_AYCGD-0cYn90x1Ib8hkUyZR-MBRqS80ammSaFhRrZusubw&oe=6683448D"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/448721997_1028487782613228_3026132092192045112_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFITq-3SLR6VJbN15GTNBYr6loAAc3BI2bqWgABzcEjZpBfeqOq4htkznEl8Zs_N6DsuRctEQcHmPJS1tWdt0TR&_nc_ohc=aR7v245ej78Q7kNvgF0Tqqk&_nc_ht=scontent.fmnl9-2.fna&oh=00_AYCJfIEAVq5gPyYC0Wj0aPt-diClxvOSeTHRsXBLQal0AA&oe=6683379A"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/448582737_1028487835946556_2961961722479276639_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGQdal4VK1T0NVh5LSJYjfG8YlU23iZfXjxiVTbeJl9eDSoeiAno0xbBSgW8GJus2iVhhyBpHpnA5j1rDJXVB_i&_nc_ohc=Y_z6pFpvu9IQ7kNvgHieTVV&_nc_ht=scontent.fmnl9-2.fna&oh=00_AYBJniBvKp2lh4S5wdDd-IacIZpIKtUaj8_YKADb90nCZQ&oe=66833ED6"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/448590238_1028487882613218_6436394694401285912_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHcR7UnZZm2cxoPeaVUXFn6AUG3nrIHi_sBQbeesgeL-xdWmpuB2wI63v9VekiqpRRonaR4-CcdFgLE7xKLYONQ&_nc_ohc=bIu83d1vPwMQ7kNvgElixOa&_nc_ht=scontent.fmnl9-2.fna&oh=00_AYAqi8NgTwrVw-wrTgBXL5EvjUSKHMcAMHND_2uOnBCk5Q&oe=66834FE4"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/447753020_1019432486852091_4923373044648781714_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEfTf0KXTpIYpdBKcZ0bXSOkKAXdoKcC9SQoBd2gpwL1FLKXlrz1TqIKdkO4HCG12qfbMBY_1ZMXLOzYC2PeiES&_nc_ohc=QnrsO89SGq8Q7kNvgEiggaP&_nc_ht=scontent.fmnl9-2.fna&oh=00_AYD8NlqP2yg3DEfeVMycjH08o6-2Bk69lVqrnFNWbJzXWQ&oe=668352D5"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/447815598_1019432533518753_8556519215010214908_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFFRUoORbqLHliTT7qg0AzoBTupQSOFJRAFO6lBI4UlEP0DyQlv1X7-vSQp4jHdgUOYpyePYRIQ5lci2tqVbH09&_nc_ohc=pT6bEJhKracQ7kNvgFilkyR&_nc_ht=scontent.fmnl9-2.fna&oh=00_AYCUzH78kdVcAEnoY0cyCMY2-TcXiEWTaEPXxeV0Z1Dm3g&oe=668325BD"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/447752913_1019432613518745_136000978506308747_n.jpg?stp=cp6_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEY5gVDVgg7kl-r4M4kmugEGJ0El0tc3mcYnQSXS1zeZ_x4qBXeHb7-gD2gUuWGXVOoNNz-lTT7BKy47m-lqCiF&_nc_ohc=PSdLBITwLf0Q7kNvgHJ85UK&_nc_ht=scontent.fmnl9-2.fna&oh=00_AYDVdXmoTqHRZFuWvR6_nykEXOrCOE1PCJV-8hXz3idbVA&oe=66835227"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

             
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
