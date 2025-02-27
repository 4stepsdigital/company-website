import React, { useRef, useEffect } from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const TechWhy4step = ({ why4step }) => {
  // console.log("why4steps data", Why4StepS);
  const carouselRef = useRef(null);

  const scrollNext = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" }); // Loop back to start
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
        }); // Loop back to end
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
        if (window.innerWidth <= 768) {
          carouselRef.current.style.overflowX = "hidden";
        } else {
          carouselRef.current.style.overflowX = "hidden";
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      scrollPrev();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="my-container mx-auto">
        <div className="relative flex items-center">
          {/* left  button */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex px-[15px] rounded-full md:h-8 md:w-8 lg:h-9 lg:w-9 text-white items-center justify-center bg-heading transition duration-300"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          {/* iamge section */}
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-hidden scroll-smooth w-full md:w-auto"
          >
            {why4step?.partnersData?.length > 0 &&
              why4step?.partnersData?.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-24 sm:h-20 md:w-40 md:h-40 flex justify-center items-center"
                >
                  <Image
                    height={200}
                    width={200}
                    src={item}
                    alt={item?.alt || "alt section"}
                    className="w-full h-36 rounded object-contain"
                  />
                </div>
              ))}
          </div>
          {/* right button */}
          <button
            onClick={scrollNext}
            className="hidden md:flex px-[15px] rounded-full md:h-8 md:w-8 lg:h-9 lg:w-9 text-white items-center justify-center bg-heading transition duration-300"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>

      <div className="pl-8 py-5">
        <ul className="custom-list">
          {why4step?.overviewData?.length > 0 &&
            why4step?.overviewData?.map((item, i) => (
              <li key={i} className=" md:text-base text-sm py-1">
                <p dangerouslySetInnerHTML={{ __html: item?.content }} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default TechWhy4step;
