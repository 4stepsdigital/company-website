import React from "react";

const Results = ({ resultData }) => {
  const result = resultData?.result || {};
  return (
    <div>
      <div className=" conatiner  w-full md:w-[735px] ">
        <div className="   md:border xl:flex flex-col w-full gap-4  p-3 relative bg-white shadow h-auto ">
          <div className=" px-2  ">
            {/* <h2 className=" text-lg py-3 font-bold">Rsults and Matrix</h2> */}

            <div className="rich-text-content">
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: result?.description || "No description available",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
