// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// const fetchAllSolutionTypes = async () => {
//   const res = await fetch("/api/technology/masterT", { method: "GET" });
//   return await res.json();
// };

// const fetchSolutionsByType = async (id) => {
//   const res = await fetch(
//     `/api/technology/get-technology?technologyType=${id}`
//   );
//   return await res.json();
// };

// const MobileTechnology = ({ activeSection, handleSectionClick }) => {
//   const [isSolutionsVisible, setIsSolutionsVisible] = useState(false);
//   const [solutionTypes, setSolutionTypes] = useState([]);
//   const [solutionsByType, setSolutionsByType] = useState({});

//   useEffect(() => {
//     // Fetch solution types on mount
//     fetchAllSolutionTypes()
//       .then((res) => {
//         setSolutionTypes(res.data || []);
//       })
//       .catch((err) => console.error("Error fetching solution types:", err));
//   }, []);

//   const toggleSolutions = () => {
//     setIsSolutionsVisible(!isSolutionsVisible);
//   };

//   const fetchAndSetSolutions = (typeId) => {
//     if (!solutionsByType[typeId]) {
//       fetchSolutionsByType(typeId)
//         .then((res) => {
//           setSolutionsByType((prev) => ({
//             ...prev,
//             [typeId]: res.data || [],
//           }));
//         })
//         .catch((err) =>
//           console.error("Error fetching solutions for type:", typeId, err)
//         );
//     }
//   };

//   const renderSolutions = () => {
//     return solutionTypes.map((type) => (
//       <div key={type?._id} className=" pl-2">
//         <h3
//           className="  font-semibold text-gray-600 text-base  cursor-pointer"
//           onClick={() => fetchAndSetSolutions(type._id)}
//         >
//           {type?.name}
//         </h3>
//         <ul className="list-none">
//           {(solutionsByType[type?._id] || []).map((solution) => (
//             <li
//               key={solution?._id}
//               onClick={() => handleSectionClick(solution?.title)}
//               className="cursor-pointer "
//             >
//               <Link href={`/technology/${solution.title.split(" ").join("-")}`}>
//                 <p
//                   className={`text-sm text-gray-600 inline-block hover:text-gray-800 transition ${
//                     activeSection === solution.title
//                       ? "border-b-2 border-heading"
//                       : ""
//                   }`}
//                 >
//                   {solution?.title}
//                 </p>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <button
//         className="w-full text-left text-gray-700  px-5  mt-5 text-md font-semibold flex items-center justify-between"
//         onClick={toggleSolutions}
//       >
//         Technology
//         {isSolutionsVisible ? (
//           <FontAwesomeIcon icon={faChevronUp} className=" text-primary" />
//         ) : (
//           <FontAwesomeIcon icon={faChevronDown} className=" text-primary" />
//         )}
//       </button>

//       {isSolutionsVisible && (
//         <div className="mt-2 space-y-2 px-4 max-h-56 overflow-y-auto scrollbar-thick">
//           {renderSolutions()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileTechnology;

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// const fetchAllSolutionTypes = async () => {
//   const res = await fetch("/api/technology/masterT", { method: "GET" });
//   return await res.json();
// };

// const fetchSolutionsByType = async (id) => {
//   const res = await fetch(
//     `/api/technology/get-technology?technologyType=${id}`
//   );
//   return await res.json();
// };

// const MobileTechnology = ({ activeSection, handleSectionClick }) => {
//   const [isSolutionsVisible, setIsSolutionsVisible] = useState(false);
//   const [solutionTypes, setSolutionTypes] = useState([]);
//   const [solutionsByType, setSolutionsByType] = useState({});

//   useEffect(() => {
//     fetchAllSolutionTypes()
//       .then((res) => {
//         setSolutionTypes(res.data || []);
//       })
//       .catch((err) => console.error("Error fetching solution types:", err));
//   }, []);

//   useEffect(() => {
//     if (isSolutionsVisible) {
//       solutionTypes.forEach((type) => {
//         if (!solutionsByType[type._id]) {
//           fetchSolutionsByType(type._id)
//             .then((res) => {
//               setSolutionsByType((prev) => ({
//                 ...prev,
//                 [type._id]: res.data || [],
//               }));
//             })
//             .catch((err) =>
//               console.error("Error fetching solutions for type:", type._id, err)
//             );
//         }
//       });
//     }
//   }, [isSolutionsVisible, solutionTypes]);

//   const toggleSolutions = () => {
//     setIsSolutionsVisible(!isSolutionsVisible);
//   };

//   return (
//     <div className="">
//       <button
//         className="w-full text-gray-700 px-5 mt-5 text-md font-semibold flex items-center justify-between"
//         onClick={toggleSolutions}
//       >
//         Technology
//         {isSolutionsVisible ? (
//           <FontAwesomeIcon icon={faChevronUp} className="text-primary" />
//         ) : (
//           <FontAwesomeIcon icon={faChevronDown} className="text-primary" />
//         )}
//       </button>

//       {isSolutionsVisible && (
//         <div className="mt-2 space-y-2 px-4 pl-6 max-h-72 overflow-y-auto scrollbar-thick">
//           {solutionTypes.map((type) => (
//             <div key={type._id} className="pl-2">
//               <h3 className="font-semibold text-heading text-base">
//                 {type.name}
//               </h3>
//               <ul className="list-none">
//                 {(solutionsByType[type._id] || []).map((solution) => (
//                   <li key={solution._id} className="cursor-pointer">
//                     <Link
//                       href={`/technology/${solution.title
//                         .split(" ")
//                         .join("-")}`}
//                     >
//                       <p
//                         className={`text-sm text-gray-600 inline-block hover:text-gray-800 transition ${
//                           activeSection === solution.title
//                             ? "border-b-2 border-heading"
//                             : ""
//                         }`}
//                       >
//                         {solution.title}
//                       </p>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileTechnology;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const getTechnologyData = async () => {
  return await (
    await fetch("/api/technology/technology-hero", { method: "GET" })
  ).json();
};

const MobileTechnology = ({ activeSection, handleSectionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionList, setSolutionList] = useState([]);

  const toggleIndustries = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await getTechnologyData();
    //   console.log("Fetched Technology Data:", res);

    //   if (res && res.data) {
    //     console.log("Solutions Data:", res.data);
    //     setSolutionList(res.data);
    //   }
    // };

    // fetchData();

    getTechnologyData().then((res) => {
      console.log("Fetched solution Data:", res?.data);
      setSolutionList(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto px-5 md:px-[2px] mt-5">
      <button
        onClick={toggleIndustries}
        className="text-gray-700 hover:text-black text-md font-semibold cursor-pointer flex items-center justify-between w-full"
      >
        Technology
        <span className=" text-primary">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isOpen && (
        <div className="mt- max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <ul className="space-y-1  list-none">
            {solutionList?.length > 0 &&
              solutionList?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={`/technology/${item?.title?.split(" ")?.join("-")}`}
                    className="flex items-center justify-between px- py-1 text-gray-800 capitalize hover:bg-white hover:text-heading  transition-colors duration-300"
                  >
                    <p
                      className={`text-sm text-gray-700  flex  justify-between  hover:text-black cursor-pointer
                      
                    `}
                      onClick={() => handleSectionClick(item?.title)} // Handle click
                    >
                      <span
                        className={` ${
                          activeSection === item?.title
                            ? "border-b-2 border-heading"
                            : ""
                        }`}
                      >
                        {item?.title || "Unnamed Industry"}
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

export default MobileTechnology;
