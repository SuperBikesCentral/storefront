import { useState, useEffect } from 'react';

export function useLocationData() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Define interfaces for location data (adjust based on your API response structure)
  interface Province {
    id: number;
    name: string;
    // ... other province properties
  }

  interface City {
    id: number;
    name: string;
    provinceId: number;
    // ... other city properties
  }

  interface Barangay {
    id: number;
    name: string;
    cityId: number;
    // ... other barangay properties
  }

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        // Fetch provinces data
        const provinceResponse = await fetch('https://your-api-endpoint/provinces');
        const provincesData: Province[] = await provinceResponse.json(); // Type assertion for clarity
        setProvinces(provincesData);

        // Fetch cities data (potentially with a province ID)
        const cityResponse = await fetch('https://your-api-endpoint/cities');
        const citiesData: City[] = await cityResponse.json(); // Type assertion for clarity
        setCities(citiesData);

        // Fetch barangays data (potentially with a city ID)
        const barangayResponse = await fetch('https://your-api-endpoint/barangays');
        const barangaysData: Barangay[] = await barangayResponse.json(); // Type assertion for clarity
        setBarangays(barangaysData);

      } catch (error) {
        console.error('Error fetching location data:', error);
        setError(error as Error | null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []); // Empty dependency array for fetching on hook invocation

  return { provinces, cities, barangays, isLoading, error };
}