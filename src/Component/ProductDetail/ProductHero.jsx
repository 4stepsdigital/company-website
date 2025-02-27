import React from "react";
import Image from "next/image";
import Link from "next/link";
const ProductHero = ({ Herodata }) => {
  const { description, path, altText, title } = Herodata || {};

  return (
    <>
      <div className="bg-blue-50 md:mt-20 mt-20 w-full min-h-[50vh] md:min-h-[60vh] xl:min-h-[70vh] flex items-center py-10">
        <div className="container-wrapper px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section (Moves up on small screens) */}
            <div className="flex justify-center lg:justify-end w-full order-1 lg:order-2">
              <Image
                src={path}
                width={500}
                height={500}
                alt={altText || "image text"}
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl capitalize font-semibold text-heading">
                {title || "Heading"}
              </h2>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                {description ||
                  "I hated every minute of training, but I said, “Don't quit. Suffer now and live the rest of your life as a champion.”"}
              </p>

              {/* Button Section (Moves after image in small screens) */}
              <div className="flex gap-3 justify-center lg:justify-start order-last lg:order-none">
                <Link href="#">
                  <button className="border text-sm md:text-base border-primary hover:text-primary hover:bg-transparent py-2 md:py-2 px-4 md:px-5 rounded-full bg-primary text-white">
                    Book A Discovery Meeting
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductHero;
