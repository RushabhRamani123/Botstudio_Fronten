import React from 'react';
import { FaStar } from "react-icons/fa";

const Testimonial: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#F9FAFB] items-center justify-center">
      <div className="max-w-md">
        <div className="max-w-full">
          <h1 className="font-inter text-[25px] leading-[38px] tracking-[0%] font-medium text-center">
            We've been using Untitled to kick start every new project and
            can't imagine working without it.
          </h1>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Pippa Wilkinson"
            />
            <span className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
              <svg
                className="h-4 w-4 text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 11-11.31 4H2a2 2 0 010-4h4.69A6 6 0 0118 8zM6 8H4a4 4 0 100 8h2a4 4 0 000-8zm8 4a4 4 0 110-8 4 4 0 010 8z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-900">
              Pippa Wilkinson
            </h3>
            <p className="text-sm text-gray-600">Head of Design, Layers</p>
          </div>

          <div className="mt-4 flex">
            {Array(5)
              .fill(5)
              .map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;