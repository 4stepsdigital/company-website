import React from "react";

const IndustryAbout = ({ about }) => {
  return (
    <div className=" bg-white ">
      {/* industry about */}
      <div className="  md:px-4 md:text-base lg:text-base  text-sm pt-5">
        <p dangerouslySetInnerHTML={{ __html: about }} />
      </div>
    </div>
  );
};

export default IndustryAbout;
