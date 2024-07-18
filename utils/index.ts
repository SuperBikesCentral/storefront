import { Brand, CarProps, CategoriesResponse, Category, FilterProps, MotorcycleResponse } from "@types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Set the required headers for the API request
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 

export async function fetchMotorcycles(filters: FilterProps) {
  const { manufacturer, year, model, fuel, name, brand, category, minPrice, maxPrice, per_page } = filters;

  // Construct the URL with query parameters
  const url = new URL("https://superbikescentral.online/api/products");

  // Add common filter parameters with type safety
  if (manufacturer) url.searchParams.append("manufacturer", manufacturer);
  if (year) url.searchParams.append("year", String(year));
  if (model) url.searchParams.append("model", model);

  // Include per_page if it exists in filters, otherwise use default (optional)
  url.searchParams.append("per_page", String(filters.per_page || 12)); // Default to 10 if not provided

  if (fuel) url.searchParams.append("fuel", fuel);

  // Add additional API parameters with type safety
  if (name) url.searchParams.append("name", name);
  if (brand) url.searchParams.append("brand", String(brand));
  if (category) url.searchParams.append("category", String(category));
  if (minPrice) url.searchParams.append("min_price", minPrice);
  if (maxPrice) url.searchParams.append("max_price", maxPrice);

  // Log the constructed URL for debugging purposes (optional)
  console.log(url.toString());

  // Perform the API request
  const response = await fetch(url.toString());

  // Parse the response as JSON (assuming the response is JSON)
  const result: MotorcycleResponse = await response.json();

  return result;
}


export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch("https://superbikescentral.online/api/categories");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: Category[] = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}



export async function fetchBrands(): Promise<Brand[]> {
  try {
    const response = await fetch("https://superbikescentral.online/api/brands");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: Brand[] = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}