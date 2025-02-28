import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const getAllPost = async () => {
  try {
    const res = await fetch("/api/industry/industry-hero", { method: "GET" });
    return await res.json();
  } catch (error) {
    console.error("Error fetching industries:", error);
    return { data: [] }; // Return empty data on error
  }
};

const DesktopIndustry = ({ activeLink, handleLinkClick }) => {
  const [dropDown, setDropdown] = useState(false);
  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    getAllPost().then((res) => {
      setIndustry(res?.data || []);
    });
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
    >
      {/* Industry Button */}
      <div
        onClick={() => handleLinkClick("/industry")}
        className={`relative inline-flex items-center text-base font-medium px-3 py-2 ${
          activeLink === "/industry" ? "text-primary" : "text-gray-800"
        } hover:text-primary transition-colors duration-300`}
      >
        Industry
        <FontAwesomeIcon
          icon={dropDown ? faChevronUp : faChevronDown}
          className="ml-1 mt-[2px] transition-transform duration-300"
          size="sm"
        />
        <span
          className={`absolute left-0 bottom-0 h-0.5 w-full bg-orange-500 transition-all duration-300 transform ${
            activeLink === "/industry" ? "scale-x-100" : "scale-x-0"
          }`}
        ></span>
      </div>

      {/* Dropdown Section */}
      {dropDown && (
        <div className="absolute left-[-20px] text-[15px] w-72 bg-background border border-gray-200 shadow-lg z-10">
          {industry.length > 0 ? (
            <ul className="space-y-1 list-none">
              {industry.map((item, i) => (
                <li key={i} className="relative group h-9">
                  <Link
                    href={`/industry/${item?.industryName
                      ?.split(" ")
                      .join("-")}`}
                    className="flex items-center justify-between px-4 py-1 text-gray-800 capitalize hover:bg-white hover:text-heading transition-colors duration-300"
                  >
                    <span>{item?.industryName}</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-gray-800 text-sm group-hover:text-heading transition-colors duration-300"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-100 text-gray-700 shadow-md">
              <p className="text-lg font-medium">No Industry Available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopIndustry;
