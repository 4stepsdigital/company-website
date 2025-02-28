import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons

const getTechnologyData = async () => {
  try {
    const response = await fetch("/api/technology/technology-hero", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching technology data:", error);
  }
};

const DesktopTechnology = ({ activeLink, handleLinkClick }) => {
  const [dropDown, setDropdown] = useState(false);
  const [solutionList, setSolutionList] = useState([]); // State to store solutions

  const handleMouseEnter = () => {
    setDropdown(true);
  };

  const handleMouseLeave = () => {
    setDropdown(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTechnologyData();
      // console.log("Fetched Technology Data:", res);
      if (res && res.data) {
        setSolutionList(res.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log("Updated Solution List:", solutionList);
  }, [solutionList]);

  return (
    <>
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          onClick={() => handleLinkClick("/technology")}
          className={`relative inline-flex items-center text-base font-medium px-3 py-2 ${
            activeLink === "/technology" ? "text-primary" : "text-gray-800"
          } hover:text-primary transition-colors duration-300`}
        >
          Technology
          {dropDown ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              className="ml-1 mt-[2px] inline-block transition-transform duration-300"
              size="sm"
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="ml-1 mt-[2px] inline-block transition-transform duration-300"
              size="sm"
            />
          )}
        </div>

        {/* Dropdown Section */}
        {dropDown && (
          <div className="absolute left-[-20px] text-[15px] w-72 bg-background border border-gray-200 shadow-lg z-10">
            <ul className="grid grid-cols-1 gap-2  list-none">
              {solutionList.length > 0 ? (
                solutionList.map((item, i) => (
                  <li key={i} className="relative group h-9">
                    <Link
                      href={`/technology/${item?.title?.split(" ")?.join("-")}`}
                      className="flex items-center justify-between px-4 py-1 text-gray-800 capitalize hover:bg-white hover:text-heading  transition-colors duration-300"
                    >
                      <span>{item?.title}</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-gray-800 text-sm group-hover:text-heading transition-colors duration-300"
                      />
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))
              ) : (
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-100 text-gray-700 shadow-md">
                  <p className="text-lg font-medium">No Technology Available</p>
                </div>

                // If no data, show this
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopTechnology;
