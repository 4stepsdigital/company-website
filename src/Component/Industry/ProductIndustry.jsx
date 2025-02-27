import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductIndustry = ({ products }) => {
  // console.log("here is all the products data ", products);

  return (
    <>
      <div>
        <div>
          <p
            className="md:text-base py-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: products?.mainEditorHtmlDescription,
            }}
          ></p>
        </div>
        {/* card section  */}

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2   gap-8 pt-5">
            {products?.productItem?.map((item, index) => (
              <div
                key={index}
                className="bg-white border cursor-pointer p-4 rounded-lg transform transition-transform duration-300 hover:scale-100 hover:shadow-md"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <Image
                      src={item?.path || "/image/bg.jpg"} // Assuming the filename is a path to an image
                      alt="welcome"
                      className="w-full h-32  md:h-full  object-cover md:w-48 rounded"
                      height={500}
                      width={500}
                    />
                  </div>

                  <Link
                    href={item?.link || "#"}
                    className="text-[21px] text-gray-700  py-2 hover:text-heading decoration-heading underline font-semibold text-center"
                  >
                    {item?.title}
                  </Link>
                </div>

                <ul className="custom-list  px-3 ">
                  {item?.editorHtmlDescription?.map((item, itemIndex) => (
                    <li
                      className=" py-[1px] md:text-base text-sm "
                      key={itemIndex}
                      dangerouslySetInnerHTML={{ __html: item?.content }}
                    ></li>
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

export default ProductIndustry;
