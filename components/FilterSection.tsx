"use client"
import React, { useState } from 'react';
import { FilterSectionProps } from "@types";

const FilterSection: React.FC<FilterSectionProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-gray-200 px-4 py-6">
      <h3 className="-mx-2 -my-3 flow-root">
        {/* Expand/collapse section button */}
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
          aria-controls={`filter-section-${title}`}
          aria-expanded={isOpen ? 'true' : 'false'}
          onClick={toggleSection}
        >
          <span className="font-medium text-gray-900">{title}</span>
          <span className="ml-6 flex items-center">
            {/* Expand icon, show/hide based on section open state. */}
            <svg
              className={`h-5 w-5 ${isOpen ? 'hidden' : 'block'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            {/* Collapse icon, show/hide based on section open state. */}
            <svg
              className={`h-5 w-5 ${isOpen ? 'block' : 'hidden'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </h3>
      {/* Filter section, show/hide based on section state. */}
      <div className={`pt-6 ${isOpen ? '' : 'hidden'}`} id={`filter-section-${title}`}>
        <div className="space-y-6">
          {options.map((option, index) => (
            <div className="flex items-center" key={`${title}-${index}`}>
              <input
                id={`filter-mobile-${title.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                name={`${title.toLowerCase().replace(/\s+/g, '-')}-option`}
                value={option.value}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`filter-mobile-${title.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
