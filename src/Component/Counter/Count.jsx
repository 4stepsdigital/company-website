// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPeopleGroup,
//   faThumbsUp,
//   faBriefcase,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";

// // Counter Component
// const Counter = ({ endValue, label, icon, className }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startValue = 0;
//     const duration = 3000; // Duration of the animation in milliseconds
//     const increment = endValue / (duration / 20);

//     const counter = setInterval(() => {
//       startValue += increment;
//       if (startValue >= endValue) {
//         startValue = endValue;
//         clearInterval(counter);
//       }
//       setCount(Math.ceil(startValue));
//     }, 20);

//     return () => clearInterval(counter);
//   }, [endValue]);

//   return (
//     <div
//       className={`flex items-center p-2  rounded-lg shadow-lg bg-white   w-72 h-32 ${className}`} // Fixed width and height
//     >
//       <div className="text-6xl bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mr-4">
//         {/* Use FontAwesomeIcon here */}
//         <FontAwesomeIcon icon={icon} className="text-red-500 count" />
//       </div>
//       <div className="flex flex-col text-center">
//         <div className="md:text-4xl text-xl font-semibold ">{count}</div>
//         <div className="font-semibold justify-center text-center text-gray-700">
//           {label}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Count = () => {
//   return (
//     <div className=" py-10 container">
//       <div className="text-center">
//         <h1 className=" md:text-3xl  text-lg font-semibold">
//           <span>Enhancing Business Experience</span>
//           <span className="block">with Technology at Heart</span>
//         </h1>
//         <h2 className="mt-4 p-4">
//           At Four Steps Digital, we infuse magic into innovation, crafting
//           unique tech solutions that redefine your business identity and enhance
//           life.
//         </h2>
//       </div>
//       <div className="flex flex-wrap justify-center gap-4 p-4">
//         <Counter
//           endValue={1500}
//           label=" Happy Client "
//           icon={faPeopleGroup}
//           className="bg-white border pl-5 border-gray-200"
//         />
//         <Counter
//           endValue={200}
//           label=" Our Experts Team"
//           icon={faUser}
//           className="bg-white border border-gray-200"
//         />
//         <Counter
//           endValue={150}
//           label="Successful Projects"
//           icon={faBriefcase}
//           className="bg-white border border-gray-200"
//         />
//         <Counter
//           endValue={6}
//           label="Year Of experience"
//           icon={faThumbsUp}
//           className="bg-white border border-gray-200"
//         />
//       </div>
//     </div>
//   );
// };

// export default Count;

// import React, { useEffect, useState, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPeopleGroup,
//   faThumbsUp,
//   faBriefcase,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";

// // Counter Component
// const Counter = ({ endValue, label, icon, className, isVisible }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (isVisible) {
//       let startValue = 0;
//       const duration = 3000; // Duration of the animation in milliseconds
//       const increment = endValue / (duration / 20);

//       const counter = setInterval(() => {
//         startValue += increment;
//         if (startValue >= endValue) {
//           startValue = endValue;
//           clearInterval(counter);
//         }
//         setCount(Math.ceil(startValue));
//       }, 20);

//       return () => clearInterval(counter);
//     }
//   }, [endValue, isVisible]);

//   return (
//     // rounded-lg shadow-lg
//     <div
//       className={`flex items-center   p-2 w-72 h-28 ${className}`} // Fixed width and height
//     >
//       <div className="text-6xl bg-orange-50 rounded-full h-20 w-20 flex items-center justify-center mr-4">
//         {/* Use FontAwesomeIcon here */}
//         <FontAwesomeIcon icon={icon} className="text-primary count" />
//       </div>
//       <div className="flex flex-col text-center">
//         <div className="md:text-3xl text-xl font-semibold ">{count}</div>
//         <div className="font-semibold justify-center text-center text-gray-700">
//           {label}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Count = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const countRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect(); // Stop observing once the section is visible
//         }
//       },
//       {
//         threshold: 0.5, // Trigger when 50% of the section is visible
//       }
//     );

//     if (countRef.current) {
//       observer.observe(countRef.current);
//     }

//     return () => {
//       if (countRef.current) {
//         observer.unobserve(countRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="md:pt-10  container pt-5  " ref={countRef}>
//       <div className="text-center">
//         <h1 className="md:text-3xl text-lg font-semibold">
//           <span>Enhancing Business Experience</span>
//           <span className="block">with Technology at Heart</span>
//         </h1>
//         <h2 className="mt-4 p-4">
//           At Four Steps Digital, we infuse magic into innovation, crafting
//           unique tech solutions that redefine your business identity and enhance
//           life.
//         </h2>
//       </div>
//       <div className="flex   flex-wrap justify-center gap-4 p-4">
//         <Counter
//           endValue={500}
//           label=" Happy Client"
//           icon={faPeopleGroup}
//           className="bg-white border-l-2 pl-5 border-gray-200"
//           isVisible={isVisible}
//         />
//         <Counter
//           endValue={100}
//           label="Our Experts Team"
//           icon={faUser}
//           className="bg-white border-l-2 border-gray-200"
//           isVisible={isVisible}
//         />
//         <Counter
//           endValue={150}
//           label="Successful Projects"
//           icon={faBriefcase}
//           className="bg-white border-l-2 border-gray-200"
//           isVisible={isVisible}
//         />

//         <Counter
//           endValue={6}
//           label="Year Of experience"
//           icon={faThumbsUp}
//           className="bg-white border-l-2 md:border-r-0 border-gray-200"
//           isVisible={isVisible}
//         />
//       </div>
//     </div>
//   );
// };

// export default Count;

import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faThumbsUp,
  faBriefcase,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Hook to detect screen size
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 768);
    updateSize(); // Initial check
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

const Counter = ({ endValue, label, icon, className, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      let startValue = 0;
      const duration = 3000; // Duration of the animation in milliseconds
      const increment = endValue / (duration / 20);

      const counter = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
          startValue = endValue;
          clearInterval(counter);
        }
        setCount(Math.ceil(startValue));
      }, 20);

      return () => clearInterval(counter);
    }
  }, [endValue, isVisible]);

  return (
    <div className={`flex items-center p-2 w-72 h-28 ${className}`}>
      <div className="text-6xl bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mr-4">
        <FontAwesomeIcon icon={icon} className="text-blue-800 count" />
      </div>
      <div className="flex flex-col text-center">
        <div className="md:text-3xl text-xl font-semibold">{count}</div>
        <div className="font-semibold text-center text-gray-700">{label}</div>
      </div>
    </div>
  );
};

const Count = () => {
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile(); // Check if the device is mobile

  const counters = [
    { endValue: 500, label: "Happy Client", icon: faPeopleGroup },
    { endValue: 100, label: "Our Experts Team", icon: faUser },
    { endValue: 150, label: "Successful Projects", icon: faBriefcase },
    { endValue: 6, label: "Years of Experience", icon: faThumbsUp },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the section is visible
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  // Auto slide every 2 seconds on mobile
  useEffect(() => {
    if (isMobile) {
      const slideInterval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % counters.length);
      }, 2000); // 2000ms = 2 seconds

      return () => clearInterval(slideInterval); // Clear the interval on unmount
    }
  }, [isMobile, counters.length]);

  return (
    <div className=" bg-background">
      <div className="md:pt-10  container py-10 " ref={countRef}>
        <div className="text-center">
          <h1 className="md:text-3xl text-lg text-heading font-semibold">
            <span>Enhancing Business Experience</span>
            <span className="block">with Technology at Heart</span>
          </h1>
          <h2 className="py-4 text-sm md:text-lg ">
            At Four Steps Digital, we infuse magic into innovation, crafting
            unique tech solutions that redefine your business identity and
            enhance life.
          </h2>
        </div>
        {isMobile ? (
          // Mobile Slider
          <div className="relative w-full  pb-8  overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                width: `${counters.length * 25}%`,
              }}
            >
              {counters.map((counter, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex justify-center"
                >
                  <Counter
                    endValue={counter.endValue}
                    label={counter.label}
                    icon={counter.icon}
                    className="bg-white border-l-2 pl-5 border-gray-200"
                    isVisible={isVisible}
                  />
                </div>
              ))}
            </div>
            {/* Indicators */}
            <div className="absolute bottom-0   left-0 right-0 flex justify-center space-x-2">
              {counters.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3  rounded-full ${
                    index === activeIndex ? "bg-blue-500" : "bg-gray-400"
                  } cursor-pointer`}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop Layout
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {counters.map((counter, index) => (
              <Counter
                key={index}
                endValue={counter.endValue}
                label={counter.label}
                icon={counter.icon}
                className="bg-white border-l-2 pl-5 border-gray-200"
                isVisible={isVisible}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Count;
