import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const SideCard = ({ statePackage }) => {
  const carouselRef = useRef(null);
  // console.log("------------------------------>nice", statePackage);
  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        carouselRef.current.style.overflowX =
          window.innerWidth <= 768 ? "scroll" : "hidden";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const statePackage = [
  //   {
  //     name: "Delightful Escape",
  //     uploads: ["/image/m1.avif"],
  //     about: "Experience the serene landscapes and tranquility.",
  //     service: "Tour and trave",
  //     industries: " custome Website",
  //     pageUrl: "delightful-escape",
  //   },
  //   {
  //     name: "Adventure Awaits",
  //     uploads: ["/image/m2.avif"],
  //     about: "Embark on a thrilling adventure like never before.",
  //     service: "E-Commerce",
  //     industries: "Zoho One",
  //     pageUrl: "adventure-awaits",
  //   },
  //   {
  //     name: "Luxury Retreat",
  //     uploads: ["/image/m3.avif"],
  //     about: "Indulge in the finest comforts and breathtaking views.",
  //     service: "Hospital management",
  //     industries: "Hubspot",
  //     pageUrl: "luxury-retreat",
  //   },
  //   {
  //     name: "Luxury Retreat",
  //     uploads: ["/image/m4.avif"],
  //     about: "Indulge in the finest comforts and breathtaking views.",
  //     service: "Real state website",
  //     industries: " Zoho",
  //     pageUrl: "luxury-retreat",
  //   },
  //   {
  //     name: "Luxury Retreat",
  //     uploads: ["/image/m5.webp"],
  //     about: "Indulge in the finest comforts and breathtaking views.",
  //     service: "Tour and trave",
  //     industries: " custome Website",
  //     pageUrl: "luxury-retreat",
  //   },
  //   // Add more static packages as needed
  // ];

  return (
    <>
      <div className="carousel-container w-full xl:mt-10 md:mt-12 mt-0 relative md:py-8">
        <div className="carousel gap-5" ref={carouselRef}>
          {statePackage?.length > 0 ? (
            statePackage?.slice(0, 6)?.map((data, i) => (
              <div
                key={i}
                className="border relative flex-shrink-0 max-w-[20rem] flex-col rounded-xl bg-white shadow-lg my-2"
              >
                <div className="mx-4 h-[10rem] mt-4 overflow-hidden shadow rounded">
                  <Image
                    className=" h-full w-full object-cover"
                    width={300}
                    height={100}
                    src={data?.path || "/image/m2.avif"}
                    alt={data?.altText || "Package image"}
                  />
                </div>
                <div className="px-6 py-4">
                  <h5 className="block text-[17px] text-heading font-semibold text-blue-gray-900">
                    {data?.title}
                  </h5>
                  <div className="line-clamp-3">
                    <p className=" md:text-sm text-xs ">{data?.description}</p>
                  </div>
                  <div className="items-center mt-2 text-right">
                    <p className="text-base text-green-700 font-semibold">
                      {data?.service}
                    </p>
                    <p className="text-base font-medium">{data?.industry}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    href={`/resource/case-studies/${encodeURIComponent(
                      data?.title?.trim().replace(/\s+/g, "-")
                    )}`}
                  >
                    <button
                      className="block w-full bg-[#2A2C41] py-3 rounded-md text-white"
                      type="button"
                    >
                      View details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No packages available.</p>
          )}

          
        </div>
        <div className="hidden text-sm cursor-pointer md:flex absolute right-5 gap-2 top-[-10px]">
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={scrollPrev}
            className="h-5 w-5 p-2   rounded-full bg-heading text-white rotate-180"
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={scrollNext}
            className="h-5 w-5 p-2  rounded-full bg-heading text-white"
          />
        </div>
      </div>
    </>
  );
};

export default SideCard;
