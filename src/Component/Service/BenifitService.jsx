import React, { useState } from "react";
import Calltoaction from "../Web/Calltoaction";

const BenifitService = ({ benefit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="">
        <h2
          className="md:text-base py-2 text-sm"
          dangerouslySetInnerHTML={{ __html: benefit?.description }}
        ></h2>

        {/* Mobile view with slider */}
        <div className="block md:hidden text-center">
          <div className="border-l-[3px] py-4 px-2 inline-block">
            <div className="text-heading text-4xl font-semibold">
              {benefit?.items[currentIndex]?.title}
            </div>
            <div className="text-gray-700 mt-2">
              {benefit?.items[currentIndex]?.description}
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {benefit?.items?.map((_, index) => (
              <button
                key={index}
                className={`h-1 w-8 ${
                  currentIndex === index ? "bg-orange-500" : "bg-gray-300"
                } rounded-md transition-all duration-300`}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop view with grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
          {benefit?.items?.map((stat, index) => (
            <div key={index} className="border-l-[3px] p-6">
              <div className="text-heading text-4xl font-semibold">
                {stat?.title}
              </div>
              <div className="text-gray-700 mt-2">{stat?.description}</div>
            </div>
          ))}
        </div>
        {/*  call to action section */}
      </div>
      <div>
        <Calltoaction />
      </div>
    </>
  );
};

export default BenifitService;
