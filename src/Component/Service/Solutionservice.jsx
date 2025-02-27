import Image from "next/image";
import Link from "next/link";
import React from "react";

const Solutionservice = ({ solution }) => {
  return (
    <>
      <div>
        <div>
          <p
            className="md:text-base py-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: solution?.mainEditorHtmlDescription,
            }}
          />
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-7 gap-3 pt-5">
            {solution?.solutionItem.map((item, index) => (
              <div
                key={index}
                className="bg-white border p-6 rounded-lg    hover:shadow"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <Image
                      src={item?.path || "/image/bg.jpg"}
                      alt="welcome"
                      className="w-full h-32  md:h-full  md:w-40 object-cover  rounded"
                      height={500}
                      width={500}
                    />
                  </div>

                  <Link
                    href={item?.link || "#"}
                    className="text-[2px] sm:text-[21px]  text-gray-700 cursor-pointer py-2 decoration-heading hover:text-heading underline font-semibold text-center "
                  >
                    {item?.title}
                  </Link>
                </div>
                <ul className="custom-list  pl-5">
                  {item?.editorHtmlDescription?.map((descItem, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm sm:text-base py-[] text-gray-700 transition-colors duration-200 hover:text-heading"
                      dangerouslySetInnerHTML={{
                        __html: descItem?.content,
                      }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Solutionservice;
