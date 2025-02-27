import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const getAllPost = async () => {
  return await (
    await fetch("/api/industry/industry-hero", { method: "GET" })
  ).json();
};

const MobileIndustry = ({ activeSection, handleSectionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [industry, setIndustry] = useState([]);

  const toggleIndustries = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    getAllPost().then((res) => {
      setIndustry(res?.data || []);
    });
  }, []);
  return (
    <div className="container mx-auto px-5 md:px-[2px] mt-5">

      <button
        onClick={toggleIndustries}
        className="text-gray-700 hover:text-black text-md font-semibold cursor-pointer flex items-center justify-between w-full"
      >
        Industries
        <span className=" text-primary">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <ul className="space-y-4  list-none">
            {industry?.length > 0 &&
              industry?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={`/industry/${
                      item?.industryName?.split(" ").join("-") || "default-slug"
                    }`}
                  >
                    <p
                      className={`text-sm text-gray-700  flex  justify-between  hover:text-black cursor-pointer
                      
                    `}
                      onClick={() => handleSectionClick(item?.industryName)} // Handle click
                    >
                      <span
                        className={` ${
                          activeSection === item?.industryName
                            ? "border-b-2 border-heading"
                            : ""
                        }`}
                      >
                        {item?.industryName || "Unnamed Industry"}
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileIndustry;
