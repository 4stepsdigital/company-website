import Image from "next/image";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Trail = () => {
  const [zoomOut, setZoomOut] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banner, setBanner] = useState([]);
  const fallbackBanner = "/image/fallback.png";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonial/testimonial");
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Handle cycling through testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setZoomOut(false);
        setTimeout(() => {
          setZoomOut(true);
        }, 2000);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [testimonials]);

  useEffect(() => {
    AOS.refresh();
  }, [currentIndex]);

  useEffect(() => {
    const handleBanner = async () => {
      try {
        const response = await fetch("/api/testimonial/banner-testimonial");
        const result = await response.json();
        setBanner(result);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    handleBanner();
  }, []);

  const backgroundImage =
    banner.length > 0 ? `url('${banner[0].path}')` : `url('${fallbackBanner}')`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-black">Loading........Testimonial</p>
      </div>
    );
  }

  const currentItem = testimonials[currentIndex];

  return (
    <div className="bg-background">
      <div>
        <div
          className="relative bg-cover w-full h-full bg-center text-white flex justify-center items-center"
          style={{ backgroundImage }}
        >
          {/* Testimonials Section */}
          <div className="flex flex-col container py-5 items-center justify-center text-gray-300 mx-auto">
            {/* Section Title */}
            <h2 className="text-xl text-heading md:text-3xl font-bold tracking-wide mb-3">
              Our Testimonials
            </h2>
            <p className="text-sm md:text-xl md:px-0 px-5 text-gray-900 max-w-5xl">
              Our clients success is our success. Here is what they have to say
              about working with us.
            </p>

            {/* Content Wrapper */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-center justify-center w-full p-4 lg:p-8">
              {/* Image Section */}
              <div
                className={`sm:w-full md:w-1/2 flex justify-center md:justify-end ${
                  zoomOut ? "zoom-out" : ""
                }`}
              >
                <div className="relative overflow-hidden cursor-pointer hover:rounded w-full h-[0vh] sm:h-[50vh] md:h-[70vh] max-w-full sm:max-w-[70vw] md:max-w-[40vw]">
                  <Image
                    src={currentItem?.path || fallbackBanner}
                    alt={currentItem?.alt}
                    className="w-full h-full object-cotain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                    height={200}
                    width={200}
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div
                className="w-full sm:w-full md:w-1/2 h-auto sm:h-[50vh] md:h-[70vh] p-4 lg:p-6 border-t border-r border-b-2 bg-gray-800 rounded-lg shadow-lg text-center sm:text-center md:text-left border-white"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                {/* Title */}
                <h3 className="text-2xl md:text-3xl mb-4">
                  {currentItem?.company}
                </h3>

                {/* Rating Section */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-yellow-500"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.843L19.335 24 12 20.254 4.665 24 6 15.266 0 9.423l8.332-1.268z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <p
                  className="mb-4 text-sm md:text-base line-clamp-6 font-semibold"
                  data-aos="fade-up"
                >
                  {currentItem?.description}
                </p>

                {/* Author Details */}
                <p className="font-semibold italic">{currentItem?.name}</p>
                <p className="text-gray-400 italic font-semibold">
                  {currentItem?.designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trail;
