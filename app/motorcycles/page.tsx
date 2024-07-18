"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchMotorcycles, fetchCategories, fetchBrands } from "@utils";
import { MotorcycleCard, FilterSection, Breadcrumb } from "@components";
import { Motorcycle, CategoriesResponse, Category, Brand } from "@types";
import Layout from "../layout"; // Assuming your layout component is located in the parent directory

const colorOptions = [
  { label: "White", value: "white" },
  { label: "Beige", value: "beige" },
  // Add more color options as needed
];

const categoryOptions = [
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Sale", value: "sale" },
  // Add more category options as needed
];

const sizeOptions = [
  { label: "2L", value: "2l" },
  { label: "6L", value: "6l" },
  // Add more size options as needed
];

export default function ShopPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    brand: 0,
    year: 0, // Initialize year as a number
    model: "",
    per_page: 100,
    fuel: "",
    category: 0,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

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

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Category[] = await fetchCategories();

        if (!result || result.length === 0) {
          throw new Error('Categories array is null or empty');
        }

        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Brand[] = await fetchBrands();

        if (!result || result.length === 0) {
          throw new Error('Brands array is null or empty');
        }

        setBrands(result);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchData();
  }, []);

  const isDataEmpty = !Array.isArray(motorcycles) || motorcycles.length === 0;

  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string | number) => {
    // Convert year to number if needed
    if (filterName === 'year') {
      value = parseInt(value as string, 10);
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Motorcycles', href: '/motorcycles' },
  ];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(event.target.value, 10);
    setSelectedCategoryId(categoryId);
    setFilters(prevFilters => ({
      ...prevFilters,
      category: categoryId,
    }));
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(event.target.value, 10);
    setSelectedCategoryId(brandId);
    setFilters(prevFilters => ({
      ...prevFilters,
      brand: brandId,
    }));
  };
  return (
    <div>
      <Head>
        <title>Motorcycles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-2xl mx-auto">
        <div className="pt-6 mb-6">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Motorcycles
          </h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  id="menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown} // Toggle dropdown visibility on click
                >
                  Sort
                  <svg
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm font-medium text-gray-900"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                    >
                      Most Popular
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-500"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                    >
                      Best Rating
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-500"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-2"
                    >
                      Newest
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-500"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-3"
                    >
                      Price: Low to High
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-500"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-4"
                    >
                      Price: High to Low
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <main className="flex">
          <div className="w-1/4 px-4 py-8">
            {" "}
            {/* Left sidebar for filters */}
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {/* <FilterSection title="Color" options={colorOptions} />
            <FilterSection title="Category" options={categoryOptions} />
            <FilterSection title="Size" options={sizeOptions} /> */}
            <div className="p-4 w-full">
              <label className="block mb-2">Select a category:</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-full"
                onChange={handleCategoryChange}
              >
                {categories?.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 w-full">
              <label className="block mb-2">Select a manufacturer:</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 w-full"
                onChange={handleBrandChange}
              >
                {brands?.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-3/4 px-4 py-8">
            {" "}
            {/* Right side for products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
              {isLoading ? (
                <p>Loading...</p>
              ) : isDataEmpty ? (
                <div className="flex items-center justify-center h-96">
                  <p className="text-lg text-gray-700">No motorcycles found.</p>
                </div>
              ) : (
                motorcycles.map((motorcycle) => (
                  <div key={motorcycle.id} className="flex flex-col mb-4">
                    <MotorcycleCard motorcycle={motorcycle} />
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
