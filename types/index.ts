import { MouseEventHandler } from "react";

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface Motorcycle {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category_id: string;
  brand_id: string;
  model: string;
  variations:  motorVariationProps[];
}

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface motorVariationProps {
  id: number;
  color: string;
  engine_cc: number;
  stock: number;
  image: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}

export interface FilterSectionProps {
  title: string;
  options: { value: string; label: string }[];
}


// Define an interface for FilterProps
export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
  name?: string;
  brand?: number;
  category?: number;
  minPrice?: string;
  maxPrice?: string;
  per_page?: number;
}

// Define an interface for the expected response structure (optional)
export interface MotorcycleResponse {
  data: Motorcycle[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface Province {
  id: number;
  code: string;
  name: string;
  region_id: string;
  province_id: string;
}
