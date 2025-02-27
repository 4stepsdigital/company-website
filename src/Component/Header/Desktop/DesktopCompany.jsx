import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons

const DesktopCompany = ({ activeLink, handleLinkClick }) => {
  const [dropDown, setDorpdown] = useState(false);

  const handleMouseEnter = () => {
    setDorpdown(true);
  };
  const handleMouseLeave = () => {
    setDorpdown(false);
  };

  return (
    <div>
      <div
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/">
          <div
            onClick={() => handleLinkClick("/")}
            className={`relative inline-block text-base font-medium px-3 py-2 text-gray-800 hover:text-orange-500`}
          >
            Company
            {dropDown ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                className="ml-1 inline-block text-sm transition-transform duration-300"
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-1 inline-block text-sm transition-transform duration-300"
              />
            )}
          </div>
        </Link>

        {/* dropdown section */}
        {dropDown && (
          <div className="absolute left-[-15px] text-[15px] w-56 bg-background border border-gray-200  shadow-lg z-20">
            <ul className="list-none">
              <li>
                <Link
                  href="/client-testimonial"
                  className="px-5 py-2 text-gray-800 hover:bg-white hover:text-heading rounded-lg transition-colors duration-300 flex justify-between items-center relative group"
                >
                  Client & Testimonial
                  <FontAwesomeIcon icon={faArrowRight} className=" text-sm " />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="resource/case-studies"
                  className="px-5 py-2 text-gray-800 hover:bg-white hover:text-heading rounded-lg transition-colors duration-300 flex justify-between items-center relative group"
                >
                  Case Studies
                  <FontAwesomeIcon icon={faArrowRight} className=" text-sm " />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/alliance"
                  className="px-5 py-2 text-gray-800 hover:bg-white hover:text-heading rounded-lg transition-colors duration-300 flex justify-between items-center relative group"
                >
                  Alliances
                  <FontAwesomeIcon icon={faArrowRight} className=" text-sm " />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="px-5 py-2 text-gray-800 hover:bg-white hover:text-heading rounded-lg transition-colors duration-300 flex justify-between items-center relative group"
                >
                  About
                  <FontAwesomeIcon icon={faArrowRight} className=" text-sm " />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/Referral"
                  className="px-5 py-2 text-gray-800 hover:bg-white hover:text-heading rounded-lg transition-colors duration-300 flex justify-between items-center relative group"
                >
                  Referral Partners
                  <FontAwesomeIcon icon={faArrowRight} className=" text-sm " />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="px-5 py-2 text-gray-800 hover:bg-white hover:text-heading rounded-lg transition-colors duration-300 flex justify-between items-center relative group"
                >
                  Career
                  <FontAwesomeIcon icon={faArrowRight} className=" text-sm " />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-heading transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopCompany;
