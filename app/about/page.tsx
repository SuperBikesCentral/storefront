import { CustomButton } from "@components";
import React from "react";

interface AboutUsProps {}

const AboutUs: React.FC<AboutUsProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-gray-100">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h1>
          <p className="text-lg leading-loose text-gray-600">
            We are a passionate team of motorcycle enthusiasts dedicated to providing the best possible experience for Filipino riders.
          </p>
          <p className="text-lg leading-loose text-gray-600">
            As a leading motorcycle dealer in the Philippines, we offer a wide selection of top-brand motorcycles, from exhilarating sports bikes to reliable commuter models.
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li className="text-base leading-loose text-gray-600">Expert sales staff to guide you.</li>
            <li className="text-base leading-loose text-gray-600">Certified service department technicians.</li>
            <li className="text-base leading-loose text-gray-600">Genuine and aftermarket parts & accessories.</li>
            <li className="text-base leading-loose text-gray-600">Regularly organized events & rides.</li>
          </ul>
        </div>
        <div className="relative">
          <img
            src="https://i.ytimg.com/vi/nQqj5n1Fa-s/maxresdefault.jpg" // Replace with your hero image
            alt="Dealership Hero Image"
            className="h-full w-full object-cover m-12 rounded-lg shadow-md"
          />
         
        </div>
      </section>

      {/* About Us Paragraph */}
      <p className="text-base leading-loose text-center text-gray-600 mt-32 max-w-5xl">
        Whether you're a seasoned rider or just starting out, we invite you to visit our dealership and experience the difference. We're confident you'll find the perfect motorcycle and the support you need to make your riding dreams a reality.
      </p>
    </div>
  );
};

export default AboutUs;