
// import React, { useRef, useEffect, useState } from "react";
// import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

// const Partners = () => {
//   const [partner, setPartner] = useState(null);
//   const [loading, SetLoading] = useState(false);
//   const fallbackSrc = "/fallback.png"; // Change this to your actual fallback image

//   useEffect(() => {
//     const handleData = async () => {
//       try {
//         SetLoading(true);
//         const response = await fetch("api/industry/partner");
//         const result = await response.json();
//         setPartner(result.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         SetLoading(false);
//       }
//     };

//     handleData();
//   }, []);

//   const carouselRef = useRef(null);

//   const scrollNext = () => {
//     if (carouselRef.current) {
//       const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
//       if (scrollLeft + clientWidth >= scrollWidth) {
//         carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         carouselRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
//       }
//     }
//   };

//   const scrollPrev = () => {
//     if (carouselRef.current) {
//       const { scrollLeft } = carouselRef.current;
//       if (scrollLeft === 0) {
//         carouselRef.current.scrollTo({
//           left: carouselRef.current.scrollWidth,
//           behavior: "smooth",
//         });
//       } else {
//         carouselRef.current.scrollBy({
//           left: -carouselRef.current.clientWidth,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (carouselRef.current) {
//         carouselRef.current.style.overflowX =
//           window.innerWidth <= 768 ? "hidden" : null;
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(scrollNext, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className=" bg-white shadow lg:h-[65vh]  md:h-[40vh] h-auto flex flex-col justify-center items-center md:py-10 pt-10 md:pt-0 px-4 md:px-24">
//       {/* Title Section */}
//       <div className="text-center ">
//         <h4 className="text-lg mb-0  text-heading md:mb-5 md:text-xl lg:text-[30px] font-semibold    max-w-3xl mx-auto">
//           Our Reliable Partner
//         </h4>
//         <h2 className="text-xs mb-0 text-gray-900 md:mb-10 md:text-lg  font-medium    max-w-3xl mx-auto">
//           Since 2020. For millions of users. We deliver top-quality, secure, and
//           adaptable digital solutions for the needs of today and the
//           opportunities of tomorrow..
//         </h2>
//       </div>

//       {/* Carousel Section */}
//       <div className="relative w-full  flex items-center">
//         {/* Left Arrow */}
//         <button
//           onClick={scrollPrev}
//           className="absolute hidden  left-0 z-10  md:flex items-center justify-center h-12 w-12 bg-primary  text-white  rounded-full p-2 shadow-md transition-all"
//         >
//           <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
//         </button>

//         {/* Carousel */}
//         <div
//           ref={carouselRef}
//           className="flex md:gap-12 gap-5  overflow-hidden  max-w-full lg:max-w-4xl md:max-w-3xl mx-auto justify-center items-center px-4"
//         >
//           {partner &&
//             partner.length > 0 &&
//             partner.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 w-full h-full sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex justify-center items-center"
//               >
//                 <Image
//                   height={200}
//                   width={200}
//                   src={item?.path||fallbackSrc}
//                   alt={item?.alt}
//                   className="w-full object-conatin  rounded-lg shadow-md"
//                 />
//               </div>
//             )):
//             (
//               <div className="flex justify-center items-center w-full h-32">
//           <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600"></span>
//         </div>
//             )
//             }
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={scrollNext}
//           className="absolute hidden right-0  z-10  md:flex items-center justify-center h-12 w-12 bg-primary rounded-full p-2 text-white shadow-md transition-all"
//         >
//           <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Partners;
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Partners = () => {
  const [partner, setPartner] = useState([]); // Changed from null to []
  const [loading, setLoading] = useState(false); // Fixed naming
  const fallbackSrc = "/fallback.png"; // Change this to your actual fallback image

  useEffect(() => {
    const handleData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/industry/partner"); // Added missing "/" before API path
        const result = await response.json();
        setPartner(result.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleData();
  }, []);

  const carouselRef = useRef(null);

  const scrollNext = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
      }
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      if (scrollLeft === 0) {
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollWidth,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: -carouselRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        carouselRef.current.style.overflowX =
          window.innerWidth <= 768 ? "hidden" : null;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(scrollNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow lg:h-[65vh] md:h-[40vh] h-auto flex flex-col justify-center items-center md:py-10 pt-10 md:pt-0 px-4 md:px-24">
      {/* Title Section */}
      <div className="text-center">
        <h4 className="text-lg mb-0 text-heading md:mb-5 md:text-xl lg:text-[30px] font-semibold max-w-3xl mx-auto">
          Our Reliable Partner
        </h4>
        <h2 className="text-xs mb-0 text-gray-900 md:mb-10 md:text-lg font-medium max-w-3xl mx-auto">
          Since 2020. For millions of users. We deliver top-quality, secure, and
          adaptable digital solutions for the needs of today and the
          opportunities of tomorrow.
        </h2>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full flex items-center">
        {/* Left Arrow */}
        <button
          onClick={scrollPrev}
          className="absolute hidden left-0 z-10 md:flex items-center justify-center h-12 w-12 bg-primary text-white rounded-full p-2 shadow-md transition-all"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex md:gap-12 gap-5 overflow-hidden max-w-full lg:max-w-4xl md:max-w-3xl mx-auto justify-center items-center px-4"
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-32">
              <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-heading"></span>
            </div>
          ) : partner.length > 0 ? (
            partner.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex justify-center items-center"
              >
                <Image
                  height={200}
                  width={200}
                  src={item?.path || fallbackSrc}
                  alt={item?.alt || "Partner logo"}
                  className="w-full object-contain rounded-lg shadow-md"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No partners Images  available</p>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollNext}
          className="absolute hidden right-0 z-10 md:flex items-center justify-center h-12 w-12 bg-primary rounded-full p-2 text-white shadow-md transition-all"
        >
          <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Partners;
