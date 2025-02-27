// import React, { useState } from "react";
// import MobileNav from "./MobileNav";
// import Categories from "./Desktop/Categories";
// import DesktopResource from "./Desktop/DesktopRsource";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import DesktopCompany from "./Desktop/DesktopCompany";
// import DesktopIndustry from "./Desktop/DesktopIndustry";
// import DesktopSolution from "./Desktop/DesktopSolution";
// import DesktopTechnology from "./Desktop/DesktopTechnology";
// import SubNav from "./SubNav";

// const Nav = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
//   const [resourceopen, setResourceopen] = useState(false);
//   const [activeLink, setActiveLink] = useState("/");

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };

//   return (
//     <>
//       <nav className=" bg-white md:sticky fixed top-0 w-full  pb-4 md:pb-3 z-50 shadow ">
//         {/* <SubNav /> */}
//         <div className=" mx-auto px-4 sm:px-6 pt-2 lg:px-8">
//           <div className="flex justify-between md:h-16 h-14">
//             {/* Logo */}
//             <div className="flex items-center">
//               <Link href="/">
//                 <div className="w-20 h-14 sm:w-20 sm:h-12 lg:w-24 lg:h-20">
//                   <Image
//                     src="/image/logonnn.png"
//                     alt="Brand Logo"
//                     className="object-contain"
//                     layout="responsive"
//                     width={500}
//                     height={500}
//                   />
//                 </div>
//               </Link>
//             </div>

//             {/* Tablet and Desktop Menu */}
//             <div className="hidden    md:flex md:space-x-6 lg:space-x-8 items-center">
//               <ul className="flex space-x-4 list-none cursor-pointer">
//                 <DesktopCompany
//                   activeLink={activeLink}
//                   handleLinkClick={handleLinkClick}
//                 />

//                 <DesktopSolution
//                   activeLink={activeLink}
//                   handleLinkClick={handleLinkClick}
//                 />

//                 <li>
//                   <Categories />
//                 </li>
//                 {/* Add DesktopIndustry Component */}
//                 <DesktopIndustry
//                   activeLink={activeLink}
//                   handleLinkClick={handleLinkClick}
//                 />
//                 <li>
//                   <DesktopResource
//                     resourceopen={resourceopen}
//                     setResourceopen={setResourceopen}
//                   />
//                 </li>
//                 <li>
//                   <DesktopTechnology
//                     activeLink={activeLink}
//                     handleLinkClick={handleLinkClick}
//                   />
//                 </li>
//                 {/* <li className="relative inline-block">
//                   <Link
//                     href="/training"
//                     onClick={() => handleLinkClick("/training")}
//                     className={`relative inline-block text-base font-medium px-3 py-2 ${
//                       activeLink === "/training"
//                         ? "text-orange-500"
//                         : "text-gray-800"
//                     } hover:text-orange-500`}
//                   >
//                     Training
//                     <span
//                       className={`absolute left-0 bottom-0 h-0.5 w-full bg-orange-500 transition-all duration-300 transform ${
//                         activeLink === "/training" ? "scale-x-100" : "scale-x-0"
//                       }`}
//                     ></span>
//                   </Link>
//                 </li> */}
//                 <li className="relative  inline-block">
//                   <Link
//                     href="/contact"
//                     onClick={() => handleLinkClick("/contact")}
//                     className={`relative inline-block text-base md:hidden lg:block  font-medium px-3 py-2 ${
//                       activeLink === "/contact"
//                         ? "text-orange-500"
//                         : "text-gray-800"
//                     } hover:text-orange-500`}
//                   >
//                     Contact us
//                     <span
//                       className={`absolute left-0 bottom-0 h-0.5 w-full bg-orange-500 transition-all duration-300 transform ${
//                         activeLink === "/contact" ? "scale-x-100" : "scale-x-0"
//                       }`}
//                     ></span>
//                   </Link>
//                 </li>
//               </ul>

//               <button className="bg-primary hide-between-700-1100     text-[13px]  text-white font-medium py-2 px-4 rounded inline-flex items-center">
//                 Talk to Us
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex  md:hidden">
//               <button
//                 type="button"
//                 className="w-full  text-gray-700 hover:text-black px-1 md:px-0 py-2 text-sm font-medium flex items-center justify-between"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? (
//                   <FontAwesomeIcon icon={faXmark} className="navicon" />
//                 ) : (
//                   <FontAwesomeIcon icon={faBars} className="navicon" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <MobileNav
//             isMobileMenuOpen={isMobileMenuOpen}
//             setIsMobileMenuOpen={setIsMobileMenuOpen}
//             isMegaMenuOpen={isMegaMenuOpen}
//             setIsMegaMenuOpen={setIsMegaMenuOpen}
//           />
//         )}
//       </nav>
//     </>
//   );
// };

// export default Nav;

import React, { useState } from "react";
import MobileNav from "./MobileNav";
import Categories from "./Desktop/Categories";
import DesktopResource from "./Desktop/DesktopRsource";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import DesktopCompany from "./Desktop/DesktopCompany";
import DesktopIndustry from "./Desktop/DesktopIndustry";
import DesktopSolution from "./Desktop/DesktopSolution";
import DesktopTechnology from "./Desktop/DesktopTechnology";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [resourceopen, setResourceopen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <nav className="bg-white fixed top-0  w-full pb-4 md:pb-3 z-50 shadow">
        <div className="mx-auto px-4 sm:px-6 pt-2 lg:px-8">
          <div className="flex justify-between md:h-16 h-14">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="w-20 h-14 sm:w-20 sm:h-12 lg:w-24 lg:h-20">
                  <Image
                    src="/image/logonnn.png"
                    alt="Brand Logo"
                    className="object-contain"
                    layout="responsive"
                    width={500}
                    height={500}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu (only visible on lg and above) */}
            <div className="hidden lg:flex lg:space-x-8 items-center">
              <ul className="flex space-x-4 list-none cursor-pointer">
                <DesktopCompany
                  activeLink={activeLink}
                  handleLinkClick={handleLinkClick}
                />
                <DesktopSolution
                  activeLink={activeLink}
                  handleLinkClick={handleLinkClick}
                />
                <li>
                  <Categories />
                </li>
                <DesktopIndustry
                  activeLink={activeLink}
                  handleLinkClick={handleLinkClick}
                />
                <li>
                  <DesktopResource
                    resourceopen={resourceopen}
                    setResourceopen={setResourceopen}
                  />
                </li>
                <li>
                  <DesktopTechnology
                    activeLink={activeLink}
                    handleLinkClick={handleLinkClick}
                  />
                </li>
                <li className="relative inline-block">
                  <Link
                    href="/contact"
                    onClick={() => handleLinkClick("/contact")}
                    className={`relative inline-block text-base font-medium px-3 py-2 ${
                      activeLink === "/contact"
                        ? "text-orange-500"
                        : "text-gray-800"
                    } hover:text-orange-500`}
                  >
                    Contact us
                    <span
                      className={`absolute left-0 bottom-0 h-0.5 w-full bg-orange-500 transition-all duration-300 transform ${
                        activeLink === "/contact" ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></span>
                  </Link>
                </li>
              </ul>

              <button className="bg-primary text-[13px] text-white font-medium py-2 px-4 rounded inline-flex items-center">
                Talk to Us
              </button>
            </div>

            {/* Mobile & Tablet Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="w-full text-gray-700 hover:text-black px-1 py-2 text-sm font-medium flex items-center justify-between"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FontAwesomeIcon icon={faXmark} className="navicon" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="navicon" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Menu */}
        {isMobileMenuOpen && (
          <MobileNav
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isMegaMenuOpen={isMegaMenuOpen}
            setIsMegaMenuOpen={setIsMegaMenuOpen}
          />
        )}
      </nav>
    </>
  );
};

export default Nav;
