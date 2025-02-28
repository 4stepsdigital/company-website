// import Image from "next/image";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { useEffect } from "react";
// import Link from "next/link";
// const Industry = () => {
//   const [data, setData] = useState([]);
//   const getIndustry = async () => {
//     const response = await fetch("api/industry/industry-hero");
//     const result = await response.json();
//     setData(result);
//     // console.log("reeeeeeeeeeee", result);
//     if (result.data && Array.isArray(result.data)) {
//       setData(result.data); // Use result.data to set the state
//     } else {
//       console.error("Expected an array of data, but got:");
//     }
//   };

//   useEffect(() => {
//     getIndustry();
//   }, []);

//   // Array of background colors
//   const bgColors = [
//     "bg-blue-100",
//     "bg-green-100",
//     "bg-yellow-100",
//     "bg-red-100",
//     "bg-purple-100",
//     "bg-pink-100",
//   ];

//   return (
//     <div className=" bg-white">
//       <div className="container-wrapper  md:py-10 py-5  px-4 md:px-0 my-5">
//         <div className="flex py-2">
//           <div>
//             <h2 className="md:text-3xl text-xl  text-heading font-semibold pb-5">
//               Our Industry Expertise
//             </h2>
//             <p className="text-sm text-gray-900 md:text-lg pb-3">
//               We have excelled our experience in a wide range of industries to
//               bring valuable insights and provide our clients with truly
//               beneficial solutions.
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {data?.length > 0 &&
//             data?.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center cursor-pointer bg-white border border-gray-300 p-4 shadow group transition-transform hover:scale-105 hover:shadow-md relative"
//               >
//                 <Link
//                   href={`/industry/${item?.industryName
//                     ?.split(" ")
//                     ?.join("-")}`}
//                 >
//                   {/* Icon Background with dynamic color */}
//                   <div
//                     className={`rounded p-2 mb- flex items-center justify-center ${
//                       bgColors[index % bgColors.length]
//                     }`}
//                   >
//                     <Image
//                       src={item?.path || "/image/1.png"}
//                       alt="qljkh"
//                       className="w-20 h-20 md:w-28 md:h-28  object-contain  max-w-full"
//                       height={200}
//                       width={200}
//                     />
//                   </div>
//                   {/* Rotating Arrow */}
//                   <span className="absolute right-3 top-2 transform rotate-[-50deg] group-hover:rotate-0 transition-transform duration-300">
//                     <FontAwesomeIcon
//                       icon={faArrowRight}
//                       className="text-heading  text-lg"
//                     />
//                   </span>
//                   {/* Card Title */}
//                   <h3 className=" md:text-lg text-sm py-1 font-medium text-center text-gray-700 group-hover:text-heading">
//                     {item?.industryName}
//                   </h3>
//                 </Link>
//                 {/* Hover Bottom Bar */}
//                 <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-heading group-hover:w-full transition-all duration-500"></div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Industry;

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Loading from "../Web/Loading";

const Industry = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIndustry = async () => {
    try {
      const response = await fetch("api/industry/industry-hero");
      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        setData(result.data);
      } else {
        console.error("Expected an array of data, but got:", result);
      }
    } catch (error) {
      console.error("Error fetching industry data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIndustry();
  }, []);

  const bgColors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-red-100",
    "bg-purple-100",
    "bg-pink-100",
  ];

  return (
    <div className="bg-white">
      <div className="container-wrapper md:py-10 py-5 px-4 md:px-0 my-5">
        <div className="flex py-2">
          <div>
            <h2 className="md:text-3xl text-xl text-heading font-semibold pb-5">
              Our Industry Expertise
            </h2>
            <p className="text-sm text-gray-900 md:text-lg pb-3">
              We have excelled our experience in a wide range of industries to
              bring valuable insights and provide our clients with truly
              beneficial solutions.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-lg font-semibold text-gray-700">
            <Loading/>
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer bg-white border border-gray-300 p-4 shadow group transition-transform hover:scale-105 hover:shadow-md relative"
              >
                <Link
                  href={`/industry/${item?.industryName
                    ?.split(" ")
                    ?.join("-")}`}
                >
                  <div
                    className={`rounded p-2 mb-2 flex items-center justify-center ${
                      bgColors[index % bgColors.length]
                    }`}
                  >
                    <Image
                      src={item?.path || "/image/1.png"}
                      alt={item?.industryName || "Industry Image"}
                      className="w-20 h-20 md:w-28 md:h-28 object-contain max-w-full"
                      height={200}
                      width={200}
                    />
                  </div>
                  <span className="absolute right-3 top-2 transform rotate-[-50deg] group-hover:rotate-0 transition-transform duration-300">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-heading text-lg"
                    />
                  </span>
                  <h3 className="md:text-lg text-sm py-1 font-medium text-center text-gray-700 group-hover:text-heading">
                    {item?.industryName}
                  </h3>
                </Link>
                <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-heading group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-lg font-semibold text-gray-700">
            No industry listed here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Industry;
