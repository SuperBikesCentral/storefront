"use client"
import { Breadcrumb, CustomButton, Modal } from '@components'; // Adjust path as per your project structure
import { useParams } from 'next/navigation';
import { useEffect, useState, ChangeEvent, FormEvent, MouseEventHandler} from 'react';
import { Motorcycle, Province, City, Barangay } from "@types";

const ProductPage = () => {
  const { slug } = useParams();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null); 
  const [selectedVariation, setSelectedVariation] = useState<Motorcycle['variations'][0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
  const [provinces, setProvinces] = useState<Province[]>([]); // State for province data
  const [cities, setCities] = useState<City[]>([]); // State for city data (initially empty)
  const [barangays, setBarangays] = useState<Barangay[]>([]); // State for city data (initially empty)
  // Form state
  const [formData, setFormData] = useState({
    product_id:  0,
    name: '',
    email: '',
    contact_number: '',
    province: '',
    city: '',
    barangay: '',
    message: ''
  });

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Motorcycles', href: '/motorcycles' },
    { name: motorcycle?.name, href: `/motorcycles/${slug}` }
  ];

  const validBreadcrumbs = breadcrumbs.map(item => ({
    name: item.name || 'Unknown', // Default to 'Unknown' if name is undefined
    href: item.href,
  }));

  const fetchCities = async (selectedProvince: string) => {
    if (!selectedProvince) return; // Handle no province selected

    try {
      const response = await fetch(`https://superbikescentral.online/api/cities/${selectedProvince}`);
      const citiesData = await response.json();
      setCities(citiesData); // Update city state with fetched data
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchBarangays = async (selectedBarangay: string) => {
    if (!selectedBarangay) return; // Handle no province selected

    try {
      const response = await fetch(`https://superbikescentral.online/api/barangays/${selectedBarangay}`);
      const barangaysData = await response.json();
      setBarangays(barangaysData); // Update city state with fetched data
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const motorcycleResponse = await fetch(`https://superbikescentral.online/api/product/${slug}`);
        const motorcycleData = await motorcycleResponse.json();
        setMotorcycle(motorcycleData);
        // Update formData.product_id on successful data fetch
        setFormData({ ...formData, product_id: motorcycleData.id });
        // Select the first variation by default
        if (motorcycleData.variations.length > 0) {
          setSelectedVariation(motorcycleData.variations[0]);
        }

        // Fetch provinces data
        const provincesResponse = await fetch('https://superbikescentral.online/api/provinces');
        const provincesData = await provincesResponse.json();
        setProvinces(provincesData as Province[]); // Type cast to Province[] for safety
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);


  const handleVariationSelect = (variation: Motorcycle['variations'][0]) => {
    setSelectedVariation(variation);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

// const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//   const { name, value } = e.target;
//   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
// };

  // const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   // Destructure the target value from the event object
  //   const { value } = e.target;
  
  //   // Update the province property in formData using the new value
  //   setFormData((prevFormData) => ({ ...prevFormData, province: value }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    // Update form data as usual
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  
    // Conditional call to fetchCities only for the "province" field
    if (name === 'province') {
      fetchCities(value); // Call fetchCities only when province changes
    }

    if (name === 'city') {
      fetchBarangays(value); // Call fetchCities only when province changes
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)

    let form = {
      product_id: formData.product_id,
      name: formData.name,
      email: formData.email,
      contact_number: formData.contact_number || '2222222',
      province_id: formData.province,
      city_id: formData.city,
      barangay: formData.barangay,
      message: formData.message,
  }
    try {
      const response = await fetch('https://superbikescentral.online/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        // Handle success
        alert('Inquiry submitted successfully!');
        closeModal(); // Close modal after successful submission
      } else {
        // Handle errors
        const errorData = await response.json();
        alert(`Failed to submit inquiry: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again later.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!motorcycle) return <div>No motorcycle found</div>;

  const formattedPrice = new Intl.NumberFormat("en-US").format(
    motorcycle.price
  );

  return (
    <div className="bg-white">
      <div className="pt-6 mb-6">
        <Breadcrumb items={validBreadcrumbs} />
      </div>

      <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-screen-2xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        {/* Left section with product image */}
        <div className="lg:col-span-2">
          <div className="aspect-w-16 aspect-h-10 overflow-hidden rounded-lg">
            <img
              src={
                selectedVariation ? selectedVariation.image : motorcycle.image
              }
              alt={motorcycle.name}
              className="h-full w-full object-cover object-center border rounded"
            />
          </div>
        </div>

        {/* Right section with product details */}
        <div className="lg:col-span-1 mt-6 lg:mt-0 lg:pl-8 bg-white">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {motorcycle.name}
            </h1>
            <div className="mt-2 flex items-center">
              <h2 className="text-3xl tracking-tight text-gray-900">
                {" "}
                &#8369;{formattedPrice}
              </h2>
              <span className="ml-2 text-sm text-gray-500">PHP</span>
            </div>
            <div className="mt-4 space-y-10">
              {/* Color variations */}
              <h3 className="text-lg font-medium text-gray-900">
                Color Variations:
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-24">
                {motorcycle.variations.map((variation) => (
                  <div
                    key={variation.id}
                    onClick={() => handleVariationSelect(variation)}
                    className={`cursor-pointer rounded-lg p-2 ${
                      selectedVariation === variation
                        ? "border-2 border-indigo-600"
                        : "border border-gray-200"
                    }`}
                  >
                    <div className="aspect-w-16 aspect-h-10 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                      <img
                        src={variation.image}
                        alt={`${motorcycle.name} in ${variation.color}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-2 flex justify-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          {variation.color}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {variation.engine_cc}cc
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquire Now button */}
              <CustomButton
                title="Inquire Now"
                containerStyles="w-full py-[16px] rounded-full bg-blue-900"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                handleClick={openModal}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Description</h2>
          <div className="mt-4 space-y-6">
            <div dangerouslySetInnerHTML={{ __html: motorcycle.description }} />
          </div>
        </div>
      </div>

      {/* Modal for Inquire Now */}
      <Modal isOpen={showModal} closeModal={closeModal}>
        {/* Modal content */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-8"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Inquiry</h2>
          <p className="text-sm text-gray-700 mb-4">
            Please fill out the form below to inquire about{" "}
            <strong>
              {motorcycle.name +
                " - " +
                selectedVariation?.color +
                " " +
                selectedVariation?.engine_cc +
                "cc"}
            </strong>
            .
          </p>
          {/* Form fields */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
            required
          />
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
            required
          >
            <option value="">Select a province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.province_id}>
                {province.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
            required
          >
            <option value="">Select a City</option>
            {/* Conditionally render city options based on selected province */}
            {formData.province &&
              cities.map((city) => (
                <option key={city.id} value={city.city_id}>
                  {city.name}
                </option>
              ))}
          </select>

          <select
            name="barangay"
            value={formData.barangay}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
            required
          >
            <option value="">Select a City</option>
            {/* Conditionally render city options based on selected province */}
            {formData.province &&
              formData.city &&
              barangays.map((barangay) => (
                <option key={barangay.id} value={barangay.id}>
                  {barangay.name}
                </option>
              ))}
          </select>

          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="Conntact Number"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full h-24 resize-none"
            required
          />
          <CustomButton
            title="Submit"
            containerStyles="w-full py-[16px] rounded-full bg-blue-900"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            btnType={"submit"}
          />
        </form>
      </Modal>
    </div>
  );
};

export default ProductPage;

         
