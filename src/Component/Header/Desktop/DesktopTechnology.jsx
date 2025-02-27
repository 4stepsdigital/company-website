// import React, { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons
// import Skeleton, { AnotherComponent } from "@/Component/Web/Skeleton";
// import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
// const fetchAllSolutionType = async () => {
//   const res = await fetch("/api/technology/masterT", { method: "GET" });
//   return await res.json();
// };

// const fetchSolutionAccordingType = async (id) => {
//   const res = await fetch(
//     `/api/technology/get-technology?technologyType=${id}`
//   );
//   return await res.json();
// };

// const DesktopTechnology = ({ activeLink, handleLinkClick }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [activeService, setActiveService] = useState(null);
//   const [solutionType, setSolutionType] = useState([]);
//   const [solutionList, setSolutionList] = useState([]);
//   const [solutionId, setSolutionId] = useState(null);
//   const [loading, setLoading] = useState(false); // New state for loading

//   useEffect(() => {
//     if (solutionId) {
//       setLoading(true); // Start loading
//       fetchSolutionAccordingType(solutionId)
//         .then((data) => {
//           setSolutionList(data?.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching solutions:", error);
//         })
//         .finally(() => {
//           setLoading(false); // Stop loading
//         });
//     }
//   }, [solutionId]);

//   useEffect(() => {
//     setLoading(true); // Start loading
//     fetchAllSolutionType()
//       .then((res) => {
//         // console.log("Fetched Technology types-------->:", res.data);
//         setSolutionType(res.data);
//         if (res.data && res.data.length > 0) {
//           setActiveService(res.data[0]);
//           fetchSolutionAccordingType(res.data[0]?._id).then((data) => {
//             setSolutionList(data?.data);
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching solution types:", error);
//       })
//       .finally(() => {
//         setLoading(false); // Stop loading
//       });
//   }, []);

//   return (
//     <>
//       <div
//         className="relative inline-block"
//         onMouseEnter={() => setIsDropdownOpen(true)}
//         onMouseLeave={() => setIsDropdownOpen(false)}
//       >
//         <div
//           className={`relative inline-block text-base font-medium px-3 py-2 hover:text-orange-500`}
//         >
//           Technology
//           <FontAwesomeIcon
//             icon={isDropdownOpen ? faChevronUp : faChevronDown}
//             className="ml-2 text-sm transition-transform duration-300"
//           />
//         </div>

//         {/* Dropdown Menu */}
//         {isDropdownOpen && (
//           <div className="absolute right-[-17vw] w-[65vw] bg-background  border">
//             <div className="flex max-w-7xl mx-auto">
//               {/* Sidebar Menu */}
//               <div className="w-1/4 border-r pt-2">
//                 <h2 className="text-lg border-b py-2 pl-2 font-semibold">
//                   Techology
//                 </h2>

//                 {solutionType?.map((solution) => (
//                   <div
//                     key={solution?._id}
//                     className="py-3 text-md rounded font-normal px-4 cursor-pointer bg-white hover:bg-background flex justify-between transition-colors"
//                     onMouseEnter={() => {
//                       setActiveService(solution);
//                       setSolutionId(solution?._id);
//                     }}
//                     onClick={() => {
//                       setActiveService(solution);
//                       setSolutionId(solution?._id);
//                     }}
//                   >
//                     <span>{solution?.name}</span>

//                     <FontAwesomeIcon
//                       icon={faChevronRight}
//                       className="text-sm"
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Content Area */}
//               <div className="flex-1 pl-10 py-4">
//                 <h2 className="text-xl font-semibold border-b transition duration-200">
//                   {activeService
//                     ? activeService.name
//                     : "Select a solution type"}
//                 </h2>

//                 {/* Loading State */}
//                 {loading ? (
//                   <Skeleton />
//                 ) : (
//                   // Show loading message or spinner
//                   <div className="">
//                     {solutionList?.map((link) => {
//                       return (
//                         <Link
//                           key={link?._id}
//                           href={`/technology/${link?.title
//                             ?.split(" ")
//                             ?.join("-")}`}
//                         >
//                           <p className="text-gray-800 text-[15px] py-1 flex gap-1 items-center hover:text-orange-500 transition duration-200">
//                             <FontAwesomeIcon
//                               icon={faChevronRight}
//                               className="text-[10px]"
//                               size={10}
//                             />
//                             {link?.title}
//                           </p>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DesktopTechnology;

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
      console.log("Fetched Technology Data:", res); // Log the entire response to the console

      if (res && res.data) {
        // Accessing res.data, as it's the correct property
        // console.log("Solutions Data:", res.data); // Log the solutions data before setting it
        setSolutionList(res.data); // Set the solutions data into state
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  // Log the solutionList data whenever it updates
  useEffect(() => {
    // console.log("Updated Solution List:", solutionList);
  }, [solutionList]); // This will run every time solutionList updates

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
                <li>No solutions available</li> // If no data, show this
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopTechnology;
