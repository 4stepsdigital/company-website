import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const ChooseUs = () => {
  const data = [
    "Customer-centric approach in business.",
    "Boost ROI and Brand Awareness.",
    "End-to-end support for services.",
    "Build and Improve Brand reputation.",
    "Track results through performance tracking.",
    "Technology-driven services.",
    "Technology-driven services.",
    "Affordable pricing & maintenance .",
  ];
  return (
    <div className=" bg-background">
      <div className="container-wrapper mx-auto py-10  ">
        <div className="text-center mb-8">
          <div className="md:text-3xl  md:flex md:flex-row flex flex-col justify-center text-center text-lg font-semibold  capitalize mb-3">
            <span className=" text-heading"> Why choose </span>
            <span className="text-primary"> Four Steps Digital ?</span>
          </div>
          <p className="md:text-lg text-sm  text-gray-900">
            Win over your customers with result-driven digital strategies.
            Choose
            <span className="text-primary"> Four Steps Digital</span> to elevate
            your business.
          </p>
        </div>

        <div className="md:flex items-center gap-16  ">
          <div className="md:w-1/2 rounded-md overflow-hidden">
            <Image
              src="/image/why.png"
              alt="Four Steps Digital"
              className="w-full h-auto object-cover"
              height={500}
              width={500}
            />
          </div>

          <div className="md:w-1/2 md:px-0 px-4  md:mt-0">
            <ul className="space-y-3">
              {data.map((item, index) => (
                <li
                  key={index}
                  className="flex md:text-lg text-sm items-start gap-3"
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-primary mt-1"
                  />
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
