// import React, { useState, useEffect } from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";

// const HeroSection = () => {
//   const data = [
//     { id: 1, images: "/image/ab.webp" },
//     { id: 2, images: "/image/ab.webp" },
//     { id: 3, images: "/image/ab.webp" },
//   ];

//   const texts = [
//     "Website Development",
//     "Zoho Consulting",
//     "Hubspot Consulting",
//     "Digital Marketing & Branding",
//     "Digital Strategy Development",
//   ];
//   const [currentText, setCurrentText] = useState("");
//   const [index, setIndex] = useState(0);
//   const [letterIndex, setLetterIndex] = useState(0);

//   // Effect to handle typing text letter by letter
//   useEffect(() => {
//     if (letterIndex < texts[index].length) {
//       const timeout = setTimeout(() => {
//         setCurrentText((prev) => prev + texts[index][letterIndex]);
//         setLetterIndex(letterIndex + 1);
//       }, 100); // Speed of typing, 100ms per letter
//       return () => clearTimeout(timeout);
//     } else {
//       const timeout = setTimeout(() => {
//         // Move to the next word after a short delay
//         setIndex((prevIndex) => (prevIndex + 1) % texts.length);
//         setCurrentText("");
//         setLetterIndex(0);
//       }, 2000); // Delay before typing the next word
//       return () => clearTimeout(timeout);
//     }
//   }, [letterIndex, index, texts]);

//   return (
//     <div className=" container ">
//       <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 p-6   items-center">
//         <div className=" ">
//           <h2 className="text-xl md:text-2xl text-orange-500 py-2 font-bold">
//             Digital Consulting Agency
//           </h2>
//           <h2 className="text-xl md:text-2xl py-4 font-semibold">
//             Transform Your Business Into A Digitally-Driven Organization
//           </h2>
//           <div>
//             <h1 className="md:text-3xl text-2xl py-4">
//               <span className="font-bold">For</span> Your
//               <div className="text-gray-800 font-bold">{currentText} |</div>
//             </h1>
//           </div>

//           <div className="mt-6">
//             <button className=" border border-orange-500  hover:text-primary hover:bg-white  py-2 md:py-3 px-4 md:px-5 rounded-xl bg-primary text-white">
//               Read More
//             </button>
//             <button className="ml-4 border border-orange-500  text-primary  py-2 md:py-3 px-4 md:px-5 rounded-xl hover:bg-primary hover:text-white">
//               Connect Now
//             </button>
//           </div>
//         </div>

//         {/* Carousel Section */}
//         <div className="mt-6 lg:mt-0">
//           <Carousel
//             showThumbs={false}
//             autoPlay
//             interval={3000}
//             infiniteLoop
//             showStatus={false}
//             showArrows={false}
//             showIndicators={false}
//             dynamicHeight={true}
//             swipeable={true}
//             stopOnHover={true}
//             emulateTouch={true}
//             onChange={(index) => console.log(`Active index: ${index}`)}
//             renderArrowPrev={(onClickHandler, hasPrev) =>
//               hasPrev && (
//                 <button
//                   className="arrow-circle left-arrow"
//                   onClick={onClickHandler}
//                 >
//                   <FontAwesomeIcon icon={faAngleLeft} />
//                 </button>
//               )
//             }
//             renderArrowNext={(onClickHandler, hasNext) =>
//               hasNext && (
//                 <button
//                   className="arrow-circle right-arrow"
//                   onClick={onClickHandler}
//                 >
//                   <FontAwesomeIcon icon={faAngleRight} />
//                 </button>
//               )
//             }
//           >
//             {data.map((item) => (
//               <div key={item.id}>
//                 <Image
//                   src={item.images}
//                   alt={`Image ${item.id}`}
//                   className="w-full h-auto rounded-lg"
//                   height={500}
//                   width={500}
//                 />
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect, useMemo } from "react";

const HeroSection = () => {
  // const texts = ["accelerate", "streamline", "ensure", "deliver", "optimize"];
  const texts = useMemo(
    () => ["accelerate", "streamline", "ensure", "deliver", "optimize"],
    []
  );
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  const [currentVideo, setCurrentVideo] = useState(0);
  const videoSources = ["/image/vid2.mp4", "/image/vid3.mp4"];

  // Typing animation logic
  useEffect(() => {
    if (letterIndex < texts[index].length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + texts[index][letterIndex]);
        setLetterIndex(letterIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const delayTimeout = setTimeout(() => {
        setCurrentText("");
        setLetterIndex(0);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 1000);
      return () => clearTimeout(delayTimeout);
    }
  }, [letterIndex, index, texts]);

  // Video switching logic
  useEffect(() => {
    const videoTimeout = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    }, 4000); // Switch videos every 4 seconds

    return () => clearInterval(videoTimeout);
  }, [videoSources.length]);

  return (
    <div className="relative  mt-20 w-full lg:h-[90vh] md:[70vh] h-[90vh] overflow-hidden flex items-center justify-center text-center">
      {/* Background Videos */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {videoSources.map((source, index) => (
          <video
            key={index}
            autoPlay
            loop
            muted
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentVideo === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={source} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Content Section */}
      <div className="relative z-10   text-white px-4">
        <h1 className="text-3xl md:text-5xl mb-4">
          Software Consulting and Development
        </h1>
        <p className="text-base md:text-lg mb-4">
          Empowering your business with digital innovation.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center md:text-left">
          <p className="text-lg md:text-3xl mb-2 md:mb-0">We</p>

          {/* Input Box with Typing Effect */}
          <div className="w-40 md:w-64 border text-yellow-300 border-white px-4 py-2 rounded-lg text-lg md:text-3xl mb-2 md:mb-0">
            {currentText} |
          </div>

          <p className="text-lg md:text-3xl">project success</p>
        </div>
      </div>
      {/* <!-- scroll arrow sign --> */}
      <div className="absolute bottom-0 md:bottom-10 z-30 animate-bounce items-center flex flex-col">
        <p className="text-white">scroll down</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" h-6 w-6 mt-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
    </div>
  );
};

export default HeroSection;
