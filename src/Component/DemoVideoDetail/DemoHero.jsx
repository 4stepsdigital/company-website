import Link from "next/link";
import React from "react";
const DemoHero = ({ videoPackageData }) => {
  const { title, description, videoLink } = videoPackageData || {};

  return (
    <>
      <div className="bg-blue-50 md:mt-20 mt-20 w-full min-h-[50vh] md:min-h-[60vh] xl:min-h-[70vh] flex items-center py-10">
        <div className="container-wrapper px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content Section */}
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-heading">
                {title || "Heading"}
              </h2>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                {description ||
                  `I hated every minute of training, but I said, “Don't quit. Suffer now and live the rest of your life as a champion.”`}
              </p>
              <Link href="#">
                <button class=" border text-sm md:text-base border-primary  hover:text-primary hover:bg-transparent  py-2 md:py-2 px-4 md:px-5 rounded-full bg-primary text-white">
                  Book A Discovery Meeting
                </button>
              </Link>
            </div>

            {/* Video Section */}
            <div className="flex justify-center lg:justify-end w-full">
              {videoLink && (
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      videoLink?.split("=")?.[1]
                    }`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-w-lg aspect-video rounded-lg overflow-hidden"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoHero;
