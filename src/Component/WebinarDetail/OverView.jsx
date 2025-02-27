import React from "react";

function OverView({ overviewdata }) {
  const overview = overviewdata?.overview || {};

  return (
    <div className="w-full md:w-[735px]">
      <div className="w-full flex flex-col gap-4 p-3 bg-white shadow h-auto">
        <div className="px-2 w-full">
          <div className="rich-text-content w-full">
            <p
              className="w-full"
              dangerouslySetInnerHTML={{
                __html:
                  overview?.description ||
                  "Currently, no detailed description is available for this section. Please check back later for more updates and information.",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
