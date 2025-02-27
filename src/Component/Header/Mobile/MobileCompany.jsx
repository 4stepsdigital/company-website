import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MobileCompany = ({ activeSection, handleSectionClick }) => {
  const [isCompanyDropdownVisible, setIsCompanyDropdownVisible] =
    useState(false);

  const toggleCompanyDropdown = () => {
    setIsCompanyDropdownVisible(!isCompanyDropdownVisible);
  };

  return (
    <div className="relative">
      <button
        className="w-full text-left text-gray-700 hover:text-black px-5 mt-5 text-md font-semibold flex items-center justify-between"
        onClick={toggleCompanyDropdown}
      >
        Company
        {isCompanyDropdownVisible ? (
          <FontAwesomeIcon icon={faChevronUp} className=" text-primary" />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} className=" text-primary" />
        )}
      </button>

      {isCompanyDropdownVisible && (
        <div className="mt-2 space-y-2 px-4 max-h-56 overflow-y-auto scrollbar-thick">
          <ul className="text-gray-700 list-none text-sm">
            <li
              className={`px-1 py-1  cursor-pointer`}
              onClick={() => handleSectionClick("About Us")}
            >
              <Link
                href="/about"
                className={`relative inline-block ${
                  activeSection === "About Us"
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:w-full"
                    : ""
                }`}
              >
                About Us
              </Link>
            </li>
            <li
              className={`px-1 py-1  cursor-pointer`}
              onClick={() => handleSectionClick("Client Testimonials")}
            >
              <Link
                href="/client-testimonial"
                className={`relative inline-block ${
                  activeSection === "Client Testimonials"
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:w-full"
                    : ""
                }`}
              >
                Client & Testimonial
              </Link>
            </li>
            <li
              className={`px-1 py-1  cursor-pointer`}
              onClick={() => handleSectionClick("Case Studies")}
            >
              <Link
                href="/resource/case-studies"
                className={`relative inline-block ${
                  activeSection === "Case Studies"
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:w-full"
                    : ""
                }`}
              >
                Case Studies
              </Link>
            </li>
            <li
              className={`px-1 py-1  cursor-pointer`}
              onClick={() => handleSectionClick("Alliance")}
            >
              <Link
                href="/alliance"
                className={`relative inline-block ${
                  activeSection === "Alliance"
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:w-full"
                    : ""
                }`}
              >
                Alliance
              </Link>
            </li>
            <li
              className={`px-1 py-1  cursor-pointer`}
              onClick={() => handleSectionClick("Referral Partners")}
            >
              <Link
                href="/Referral"
                className={`relative inline-block ${
                  activeSection === "Referral Partners"
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:w-full"
                    : ""
                }`}
              >
                Referral Partners
              </Link>
            </li>
            <li
              className={`px-1 py-1 cursor-pointer`}
              onClick={() => handleSectionClick("Career")}
            >
              <Link
                href="/career"
                className={`relative inline-block ${
                  activeSection === "Career"
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:w-full"
                    : ""
                }`}
              >
                Career
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileCompany;
