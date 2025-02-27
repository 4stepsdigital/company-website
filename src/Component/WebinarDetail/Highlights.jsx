import React from "react";

const Features = ({ hightlightdata }) => {
  const highlightsDescription = hightlightdata?.highlights?.description;

  return (
    <div className=" conatiner w-full md:w-[735px]">
      <div className="   md:border xl:flex flex-col w-full gap-4  py-3 px-1 relative bg-white shadow h-auto ">
        <div className=" px-2  ">
          <div>
            {highlightsDescription && (
              <div
                className="rich-text-content w-full "
                dangerouslySetInnerHTML={{
                  __html:
                    highlightsDescription ||
                    "Currently, no detailed description is available for this section. Please check back later for more updates and information.",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
