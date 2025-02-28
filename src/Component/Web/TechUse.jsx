// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Link from "next/link";
// const TechUse = () => {
//   const [data, setData] = useState();
//   useEffect(() => {
//     const getAllTech = async () => {
//       const response = await fetch("api/technology/get-titleHome");
//       const result = await response.json();
//       setData(result);
//       // console.log("reeeeeeeeeeeenice", data);
//     };

//     getAllTech();
//   }, []);

//   const [expand, SetExpand] = useState(false);
//   useEffect(() => {
//     AOS.init({
//       once: true,
//       disable: "phone",
//       duration: 700,
//       easing: "ease-out-cubic",
//     });
//   }, []);

//   return (
//     <div className="container  ">
//       <div data-aos="fade-up" className="text-center pt-10  ">
//         <h4 className="text-lg mb-0  text-heading md:mb-5 md:text-xl lg:text-[30px] font-semibold    max-w-3xl mx-auto">
//           Technologies Behind Our Web Development Excellence
//         </h4>
//         <h2 className="text-xs mb-0 text-gray-900 md:mb-5 md:text-lg  font-medium    max-w-3xl mx-auto">
//           From robust backend systems to dynamic front-end experiences, our
//           stack ensures performance, scalability, and unmatched user engagement.
//         </h2>
//       </div>

//       <div className="  md:px-8 py-5  lg:px-10 px-7">
//         <div
//           data-aos="fade-up"
//           className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  cursor-pointer"
//         >
//           {data?.length > 0 &&
//             data?.map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-95 transition-transform duration-200"
//               >
//                 <Link
//                   href={`/technology/${item?.title?.split(" ")?.join("-")}`}
//                 >
//                   <div className="w-full h-44 p-5  relative">
//                     <Image
//                       className="w-full h-full  rounded-md object-cover"
//                       src={item?.path}
//                       alt={item?.title || "item Image"}
//                       height={300}
//                       width={300}
//                     />
//                   </div>
//                   <div className="px-4 pb-4">
//                     <h3 className=" md:text-lg text-base  font-semibold text-gray-800 truncate">
//                       {item?.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1 line-clamp-1">
//                       {item?.description || "Description unavailable"}
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TechUse;

import Image from "next/image";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const TechUse = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllTech = async () => {
      try {
        const response = await fetch("/api/technology/get-titleHome");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to load technologies.");
      } finally {
        setLoading(false);
      }
    };

    getAllTech();
  }, []);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="container">
      <div data-aos="fade-up" className="text-center pt-10">
        <h4 className="text-lg mb-0 text-heading md:mb-5 md:text-xl lg:text-[30px] font-semibold max-w-3xl mx-auto">
          Technologies Behind Our Web Development Excellence
        </h4>
        <h2 className="text-xs mb-0 text-gray-900 md:mb-5 md:text-lg font-medium max-w-3xl mx-auto">
          From robust backend systems to dynamic front-end experiences, our
          stack ensures performance, scalability, and unmatched user engagement.
        </h2>
      </div>

      <div className="md:px-8 py-5 lg:px-10 px-7">
        {loading ? (
          <div className="text-center py-10 text-lg font-semibold text-gray-700">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-lg font-semibold text-red-500">
            {error}
          </div>
        ) : data?.length > 0 ? (
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 cursor-pointer"
          >
            {data?.map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-95 transition-transform duration-200"
              >
                <Link
                  href={`/technology/${item?.title?.split(" ")?.join("-")}`}
                >
                  <div className="w-full h-44 p-5 relative">
                    <Image
                      className="w-full h-full rounded-md object-cover"
                      src={item?.path || "/image/default.png"}
                      alt={item?.title || "Technology Image"}
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className="px-4 pb-4">
                    <h3 className="md:text-lg text-base font-semibold text-gray-800 truncate">
                      {item?.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {item?.description || "Description unavailable"}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-lg font-semibold text-gray-700">
            No technologies listed.
          </div>
        )}
      </div>
    </div>
  );
};

export default TechUse;
