import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductSolution = ({ productsolution }) => {
  // console.log("here is all data productsolution---->", productsolution);
  return (
    <>
      <div>
        <div>
          <p
            className="md:text-base py-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: productsolution?.mainEditorHtmlDescription,
            }}
          />
        </div>
        {/* Card section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-5">
            {productsolution?.productItem?.map((item, index) => (
              <div
                key={index}
                className="bg-white border cursor-pointer p-4 rounded-lg transform transition-transform duration-300 hover:scale-100 hover:shadow-md"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <Image
                      src={item?.path || "/image/bg.jpg"}
                      alt={item.title}
                      // className="w-full h-32 md:h-36 md:w-36 object-cover rounded"
                      className="w-full h-32 md:h-full md:w-52 object-cover rounded"
                      height={500}
                      width={500}
                    />
                  </div>

                  <Link
                    href={item?.link}
                    className="text-[22px] py-2 hover:text-heading decoration-heading underline font-semibold text-center"
                  >
                    {item?.title}
                  </Link>
                </div>

                {/* Rendering list items */}
                <ul className="custom-list pl-5">
                  {item.editorHtmlDescription.map((listItem, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="py-[1px] md:text-base text-sm hover:text-heading"
                      dangerouslySetInnerHTML={{ __html: listItem.content }}
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

export default ProductSolution;
