import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="mx-auto flex  items-center space-x-2 px-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <a
                href={item.href}
                className={`mr-2 text-sm font-medium ${
                  index === items.length - 1 ? 'text-gray-500 hover:text-gray-600' : 'text-gray-900'
                }`}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.name}
              </a>
              {index < items.length - 1 && (
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
