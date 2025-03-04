import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const OurServiceSolution = ({ SolutionService }) => {
  // console.log(
  //   " here is print the solution service section------>",
  //   SolutionService
  // );
  return (
    <>
      <div>
        <div>
          <p
            className="md:text-base py-3 text-sm"
            dangerouslySetInnerHTML={{
              __html: SolutionService?.mainEditorHtmlDescription,
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {SolutionService?.serviceItem?.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg border-t-[8px] border-primary hover:shadow-lg transition-all duration-300 mx-auto w-full max-w-md h-auto border-b-[1px] border-l-[1px] border-r-[1px] border-b-gray-300 border-l-gray-300 border-r-gray-300"
            >
              <div className="md:px-6 px-3 py-6">
                <div className="flex justify-center items-center mb-6">
                  <div className="mb-4">
                    <Image
                      src={item?.path || "/image/fallback.png"} // Assuming the filename is a path to an image
                      alt={item?.imageAlt || "Service Image"}
                      className="w-full h-32 md:h-full md:w-52 object-cover rounded"
                      height={500}
                      width={500}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="md:text-xl text-gray-800 text-base  font-semibold mb-2">
                    {item?.title || " OverView Title Here"}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base font-medium">
                    {item?.subTitle}
                  </p>
                </div>
                <ul className="mt-4 text-gray-600 custom-list px-4">
                  {item?.editorHtmlDescription?.map((list, idx) => (
                    <li
                      key={idx}
                      className="mb-[2px] text-sm md:text-base"
                      dangerouslySetInnerHTML={{
                        __html: list?.content,
                      }}
                    ></li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-center">
                  <Link
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-sm md:text-base lg:text-lg py-2 px-6 inline-flex items-center transition-transform duration-300"
                  >
                    Request details
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-2 transform hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurServiceSolution;
