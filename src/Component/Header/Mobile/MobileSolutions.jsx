// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// const fetchAllSolutionTypes = async () => {
//   const res = await fetch("/api/solution/masterS", { method: "GET" });
//   return await res.json();
// };

// const fetchSolutionsByType = async (id) => {
//   const res = await fetch(`/api/solution/get-solution?solutionType=${id}`);
//   return await res.json();
// };

// const MobileSolutions = ({ activeSection, handleSectionClick }) => {
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
//               onClick={() => handleSectionClick(solution.title)}
//               className="cursor-pointer "
//             >
//               <Link href={`/solution/${solution.title.split(" ").join("-")}`}>
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
//         Solutions
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

// export default MobileSolutions;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const fetchAllSolutionTypes = async () => {
  const res = await fetch("/api/solution/masterS", { method: "GET" });
  return await res.json();
};

const fetchSolutionsByType = async (id) => {
  const res = await fetch(`/api/solution/get-solution?solutionType=${id}`);
  return await res.json();
};

const MobileSolutions = ({ activeSection, handleSectionClick }) => {
  const [isSolutionsVisible, setIsSolutionsVisible] = useState(false);
  const [solutionTypes, setSolutionTypes] = useState([]);
  const [solutionsByType, setSolutionsByType] = useState({});

  useEffect(() => {
    fetchAllSolutionTypes()
      .then((res) => {
        setSolutionTypes(res.data || []);
      })
      .catch((err) => console.error("Error fetching solution types:", err));
  }, []);

  useEffect(() => {
    if (isSolutionsVisible) {
      solutionTypes.forEach((type) => {
        if (!solutionsByType[type._id]) {
          fetchSolutionsByType(type._id)
            .then((res) => {
              setSolutionsByType((prev) => ({
                ...prev,
                [type._id]: res.data || [],
              }));
            })
            .catch((err) =>
              console.error("Error fetching solutions for type:", type._id, err)
            );
        }
      });
    }
  }, [isSolutionsVisible, solutionTypes]);

  const toggleSolutions = () => {
    setIsSolutionsVisible(!isSolutionsVisible);
  };

  return (
    <div className="">
      <button
        className="w-full text-gray-700 px-5 mt-5 text-md font-semibold flex items-center justify-between"
        onClick={toggleSolutions}
      >
        Solutions
        {isSolutionsVisible ? (
          <FontAwesomeIcon icon={faChevronUp} className="text-primary" />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} className="text-primary" />
        )}
      </button>

      {isSolutionsVisible && (
        <div className="mt-2 space-y-2 px-4  pl-6 max-h-72 overflow-y-auto scrollbar-thick">
          {solutionTypes.map((type) => (
            <div key={type._id} className="pl-1">
              <h3 className="font-semibold capitalize text-heading text-base">
                {type.name}
              </h3>
              <ul className="list-none">
                {(solutionsByType[type._id] || []).map((solution) => (
                  <li key={solution._id} className="cursor-pointer">
                    <Link
                      href={`/solution/${solution.title.split(" ").join("-")}`}
                    >
                      <p
                        className={`text-sm  capitalize  text-gray-600 inline-block hover:text-gray-800 transition ${
                          activeSection === solution.title
                            ? "border-b-2 border-heading"
                            : ""
                        }`}
                      >
                        {solution.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileSolutions;
