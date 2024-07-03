"use client"

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-2xl w-full mx-4 sm:mx-auto">
          {/* Modal header */}
          <div className="px-6 py-4 ">
            <div className="flex justify-between items-center">
              <button onClick={closeModal} className="text-blue-900 hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
